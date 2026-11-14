# Clipboard watcher for the inpatient chart check (event-driven).
# Windows notifies a hidden listener window on every clipboard change (AddClipboardFormatListener),
# so nothing has to be opened or focused and the agent can keep copying. The listener grabs the
# text the instant it changes (compiled code, no PowerShell in the hot path) and a background
# thread appends it to the raw file under an auto-detected "### <Section>" header, so a large
# copy is never lost because the next copy started. Stop it with finish.ps1.
# Start: Start-Process powershell -WindowStyle Hidden -ArgumentList '-NoProfile','-STA','-ExecutionPolicy','Bypass','-File','<this file>'[,'-Out','<patient raw.txt>']
param(
  [string]$Dir = "$env:TEMP\chart-check",
  [string]$Out = ''   # optional: append straight into the patient's raw file instead of $Dir\raw.txt
)
New-Item -ItemType Directory -Force $Dir | Out-Null
$raw = if ($Out) { $Out } else { Join-Path $Dir 'raw.txt' }
$log = Join-Path $Dir 'captures.log'; $stop = Join-Path $Dir 'stop.flag'
if (-not $Out) { Remove-Item $raw -ErrorAction SilentlyContinue }
Remove-Item $log, $stop -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force (Split-Path $raw) | Out-Null

Add-Type -ReferencedAssemblies System.Windows.Forms -TypeDefinition @'
using System;
using System.Collections.Concurrent;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Windows.Forms;

public class ClipWatch : NativeWindow {
    [DllImport("user32.dll")] static extern bool AddClipboardFormatListener(IntPtr h);
    [DllImport("user32.dll")] static extern bool RemoveClipboardFormatListener(IntPtr h);
    const int WM_CLIPBOARDUPDATE = 0x031D;

    static readonly string[][] Labels = {
        new[]{@"Vitals \(last day\)", "Vitals"},
        new[]{@"Medication Administration Report", "MAR Administrations"},
        new[]{@"Microbiology Results", "Micro Summary (90 Days)"},
        new[]{@"I/O Detailed", "I/O Detail (1 hour)"},
        new[]{@"AI Hospital Course Note", "AI Hospital Course"},
        new[]{@"Notes Summary by Service", "IP Insights"},
        new[]{@"New Results - Lab", "New Results - Lab (sidebar)"},
        new[]{@"New Results - Imaging", "New Results - Imaging (sidebar)"},
        new[]{@"^\s*Reason for admission:", ".ippull dot phrase"},
        new[]{@"Narrative & Impression|PACS Images", "Chart Review - Radiology"},
        new[]{@"Order Tracking|Ref Range & Units", "Chart Review - Labs (detailed)"},
        new[]{@"ModifyDiscontinue|Let ExpireModify", "Manage Orders - Active"},
        new[]{@"Parent ID:.*Order ID:|Cancel Reason:", "All Ord"},
        new[]{@"Date of Service:", "Chart Review - Notes"},
    };

    readonly string raw, log, stop;
    readonly BlockingCollection<Tuple<DateTime,string>> queue = new BlockingCollection<Tuple<DateTime,string>>();
    readonly System.Windows.Forms.Timer timer = new System.Windows.Forms.Timer();
    readonly UTF8Encoding enc = new UTF8Encoding(false);
    Thread writer;
    string lastHash = "";
    int n = 0;

    public ClipWatch(string raw, string log, string stop) {
        this.raw = raw; this.log = log; this.stop = stop;
        CreateHandle(new CreateParams());
        AddClipboardFormatListener(Handle);
        writer = new Thread(Write) { IsBackground = true };
        writer.Start();
        timer.Interval = 500;
        timer.Tick += (s, e) => { if (File.Exists(stop)) Shutdown(); };
        timer.Start();
        Log(string.Format("watcher started -> {0}", raw));
    }

    protected override void WndProc(ref Message m) {
        if (m.Msg == WM_CLIPBOARDUPDATE) Grab();
        base.WndProc(ref m);
    }

    void Grab() {
        // The writing app can hold the clipboard briefly; retry rather than lose the copy.
        for (int i = 0; i < 40; i++) {
            try {
                if (!Clipboard.ContainsText()) return;
                queue.Add(Tuple.Create(DateTime.Now, Clipboard.GetText()));
                return;
            } catch (ExternalException) { Thread.Sleep(25); }
        }
        Log("clipboard locked, capture skipped");
    }

    void Write() {
        using (var sha = SHA256.Create()) {
            foreach (var item in queue.GetConsumingEnumerable()) {
                string t = item.Item2;
                if (string.IsNullOrEmpty(t)) continue;
                string h = BitConverter.ToString(sha.ComputeHash(enc.GetBytes(t))).Replace("-", "").Substring(0, 12);
                if (h == lastHash) continue;   // Citrix often fires several updates for one copy
                lastHash = h; n++;
                string label = Label(t);
                File.AppendAllText(raw, "### " + label + "\r\n" + t + "\r\n\r\n", enc);
                Log(string.Format("#{0}  {1}  chars={2}  sha={3}  copied={4:HH:mm:ss.fff}", n, label, t.Length, h, item.Item1));
            }
        }
    }

    static string Label(string t) {
        string head = t.Substring(0, Math.Min(1500, t.Length));
        foreach (var l in Labels)
            if (Regex.IsMatch(head, l[0], RegexOptions.Multiline)) return l[1];
        return "Unlabeled capture";
    }

    void Log(string msg) {
        lock (log) File.AppendAllText(log, DateTime.Now.ToString("HH:mm:ss.fff") + "  " + msg + "\r\n");
    }

    void Shutdown() {
        timer.Stop();
        RemoveClipboardFormatListener(Handle);
        queue.CompleteAdding();
        writer.Join(10000);   // finish writing everything already grabbed
        Log("watcher stopped");
        DestroyHandle();
        Application.ExitThread();
    }
}
'@

$null = New-Object ClipWatch $raw, $log, $stop
[Windows.Forms.Application]::Run()
