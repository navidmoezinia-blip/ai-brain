#Requires AutoHotkey v2.0
#SingleInstance Force
CoordMode "Mouse", "Screen"

; ================= CONFIG =================
PTT_KEY   := "F13"        ; your push-to-talk key (same one your dictation app uses; mouse buttons like XButton1 work too)
MODE      := "clipboard"  ; "clipboard" = dictation app leaves text on clipboard -> script pastes it
                          ; "focus"     = dictation app types into the focused field -> script clicks chat box on press
USE_WINH  := false        ; true = use Windows Voice Typing (Win+H) as the engine (uses focus behavior)
WAIT_MS   := 8000         ; clipboard mode: max wait for transcript after release
SETTLE_MS := 1500         ; focus/Win+H mode: wait after release for text to finish typing
INI       := A_ScriptDir "\ptt_chat.ini"
; ==========================================
; Ctrl+Alt+C = calibrate (hover over chat box, press)
; Ctrl+Alt+S = pause/resume script

chatX := IniRead(INI, "chat", "x", "")
chatY := IniRead(INI, "chat", "y", "")
held := false, mx := 0, my := 0, origWin := 0, clipSaved := ""

Hotkey "~*" PTT_KEY, PTT_Down
Hotkey "~*" PTT_KEY " up", PTT_Up

^!c:: {
    global
    MouseGetPos &chatX, &chatY
    IniWrite chatX, INI, "chat", "x"
    IniWrite chatY, INI, "chat", "y"
    Tip("Chat box saved: " chatX ", " chatY)
}

^!s:: {
    Suspend -1
    Tip(A_IsSuspended ? "PTT paused" : "PTT active")
}

PTT_Down(*) {
    global
    if held
        return
    held := true
    MouseGetPos &mx, &my
    origWin := WinExist("A")
    if (MODE = "clipboard" && !USE_WINH) {
        clipSaved := ClipboardAll()
        A_Clipboard := ""
    } else {
        if !ClickChat()
            return
        if USE_WINH
            Send "#h"
    }
}

PTT_Up(*) {
    global
    if !held
        return
    held := false
    if (MODE = "clipboard" && !USE_WINH) {
        if !ClipWait(WAIT_MS / 1000) {
            A_Clipboard := clipSaved
            Tip("No transcript received")
            return
        }
        if !ClickChat()
            return
        Send "^v"
        Sleep 150
        Send "{Enter}"
        Sleep 150
        A_Clipboard := clipSaved
    } else {
        Sleep SETTLE_MS
        if USE_WINH
            Send "#h"   ; stop voice typing
        Sleep 100
        Send "{Enter}"
    }
    Restore()
}

ClickChat() {
    global
    if (chatX = "" || chatY = "") {
        Tip("Calibrate first: hover chat box, Ctrl+Alt+C")
        return false
    }
    Click chatX, chatY
    Sleep 80
    return true
}

Restore() {
    global
    if WinExist("ahk_id " origWin)
        WinActivate
    MouseMove mx, my, 0
}

Tip(msg) {
    ToolTip msg
    SetTimer () => ToolTip(), -1500
}
