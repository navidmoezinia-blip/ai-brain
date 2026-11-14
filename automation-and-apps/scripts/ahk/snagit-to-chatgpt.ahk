#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+Q = Snagit region capture (Snagit's Alt+Q "Image" preset copies to clipboard),
; then switch to ChatGPT and paste. Does not press Enter.

waiting := false

^!q:: {
    global waiting
    KeyWait "Ctrl"
    KeyWait "Alt"
    waiting := true
    SetTimer () => waiting := false, -60000
    Send "!q"
}

OnClipboardChange ClipChanged

ClipChanged(dataType) {
    global waiting
    if (!waiting || dataType != 2)
        return
    waiting := false
    SetTimer PasteToChatGPT, -250
}

PasteToChatGPT() {
    target := WinExist("ahk_exe ChatGPT.exe") ? "ahk_exe ChatGPT.exe" : "ChatGPT ahk_exe chrome.exe"
    if !WinExist(target) {
        ToolTip "ChatGPT window not found"
        SetTimer () => ToolTip(), -2000
        return
    }
    WinActivate target
    WinWaitActive target, , 2
    Sleep 300
    Send "^v"
}
