#Requires AutoHotkey v2.0
#SingleInstance Force

Enabled := false
Collected := ""
Separator := "`r`n`r`n"

OnClipboardChange(CollectCopy)

^!c:: {
    global Enabled
    Critical
    Enabled := !Enabled
    Notify(Enabled ? "Clipboard accumulation: ON"
                   : "Clipboard accumulation: OFF")
}

^!Backspace:: {
    global Collected
    Critical
    Collected := ""
    A_Clipboard := ""
    Notify("Collection cleared")
}

CollectCopy(DataType) {
    global Enabled, Collected, Separator
    Critical
    if !Enabled || DataType != 1
        return
    if DllCall("GetClipboardOwner", "Ptr") = A_ScriptHwnd
        return
    if DllCall("IsClipboardFormatAvailable", "UInt", 15)
        return
    try {
        Text := A_Clipboard
        if Text = ""
            return
        Combined := Collected = ""
            ? Text
            : Collected . Separator . Text
        A_Clipboard := Combined
        Collected := Combined
    } catch {
        Notify("Clipboard busy: copy that selection again")
    }
}

Notify(Message) {
    ToolTip(Message)
    SetTimer(HideNotice, -1200)
}

HideNotice() {
    ToolTip()
}
