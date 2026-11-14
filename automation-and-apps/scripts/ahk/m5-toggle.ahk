#Requires AutoHotkey v2.0
#SingleInstance Force

enabled := true

; Ctrl+Alt+M toggles the remap on/off
^!m:: {
    global enabled
    enabled := !enabled
    ToolTip "M5 -> Ctrl+Shift+Z: " (enabled ? "ON" : "OFF")
    SetTimer () => ToolTip(), -1000
}

; M5 sends Ctrl+Shift+Z only while enabled; otherwise M5 behaves normally
#HotIf enabled
XButton2::Send "^+z"
#HotIf
