#Requires AutoHotkey v2.0
#SingleInstance Force
; Clip Collector: collects every copy, confirms each one, pastes all at once.
; Ctrl+Alt+C  toggle collecting on/off (ON starts a fresh list)
; While ON: Ctrl+C adds to list, Ctrl+V pastes the whole list
; While OFF: Ctrl+C / Ctrl+V behave normally

SEP := "`r`n`r`n"          ; separator between items when pasting
FAIL_MS := 700             ; how long to wait before saying a Ctrl+C failed

items := [], collecting := false, selfSet := false, gotChange := true

CoordMode "Mouse", "Screen"

; flash popup near the mouse
fGui := Gui("+AlwaysOnTop -Caption +ToolWindow +E0x20")
fGui.SetFont("s11 bold", "Segoe UI")
fGui.MarginX := 10, fGui.MarginY := 6
ftxt := fGui.AddText("cWhite w340")

; persistent badge, top-right
badge := Gui("+AlwaysOnTop -Caption +ToolWindow +E0x20")
badge.BackColor := "1565C0"
badge.SetFont("s10 bold", "Segoe UI")
btxt := badge.AddText("cWhite w150 Center", "")

OnClipboardChange(ClipChanged)

^!c:: ToggleCollect()

#HotIf collecting && items.Length
$^v:: PasteAll()
#HotIf

; watch Ctrl+C so a copy that didn't take is flagged
~^c:: {
    global gotChange
    if !collecting
        return
    gotChange := false
    SetTimer(CheckCopied, -FAIL_MS)
}

CheckCopied() {
    if !gotChange {
        SoundBeep 300, 150
        Flash("✗ NOT copied — try again", "C62828")
    }
}

ClipChanged(type) {
    global gotChange
    if selfSet || !collecting
        return
    if type != 1 {
        gotChange := true
        Flash("✗ Not text — skipped", "C62828")
        return
    }
    txt := A_Clipboard
    if Trim(txt, " `t`r`n") = ""
        return
    norm := Trim(RegExReplace(txt, "\s+", " "))
    for i, t in items
        if Trim(RegExReplace(t, "\s+", " ")) == norm {
            gotChange := true
            SoundBeep 600, 80
            Flash("⚠ Duplicate of #" i " — skipped", "EF6C00")
            return
        }
    items.Push(txt)
    gotChange := true
    SoundBeep 1500, 50
    prev := SubStr(RegExReplace(txt, "\s+", " "), 1, 45)
    Flash("✓ #" items.Length "  " prev, "2E7D32")
    UpdateBadge()
}

ToggleCollect() {
    global collecting
    collecting := !collecting
    if collecting
        items.Length := 0
    Flash(collecting ? "Collecting ON" : "Collecting OFF", "1565C0")
    UpdateBadge()
}

PasteAll() {
    global selfSet
    if !items.Length {
        Flash("Nothing collected", "C62828")
        return
    }
    out := ""
    for i, t in items
        out .= (i > 1 ? SEP : "") t
    selfSet := true
    saved := ClipboardAll()
    A_Clipboard := ""
    A_Clipboard := out
    if ClipWait(2) {
        Send "^v"
        Sleep 400
        Flash("Pasted " items.Length " items", "1565C0")
    } else
        Flash("✗ Paste failed", "C62828")
    A_Clipboard := saved
    Sleep 150
    selfSet := false
}

UndoLast() {
    if items.Length {
        items.Pop()
        Flash("Removed last — " items.Length " left", "EF6C00")
        UpdateBadge()
    }
}

ClearAll() {
    items.Length := 0
    Flash("Cleared", "EF6C00")
    UpdateBadge()
}

Flash(msg, color) {
    MouseGetPos &x, &y
    fGui.BackColor := color
    ftxt.Value := msg
    fGui.Show("x" (x + 18) " y" (y + 18) " NoActivate AutoSize")
    SetTimer(() => fGui.Hide(), -1300)
}

UpdateBadge() {
    if collecting {
        btxt.Value := "● Collecting: " items.Length
        badge.Show("x" (A_ScreenWidth - 180) " y10 NoActivate AutoSize")
    } else
        badge.Hide()
}
