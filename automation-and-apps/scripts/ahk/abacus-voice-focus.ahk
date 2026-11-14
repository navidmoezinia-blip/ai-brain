#Requires AutoHotkey v2.0+
#SingleInstance Force

; Mouse Button 5 continues directly to Superwhisper while this script brings
; the Abacus Desktop Listener "Session" overlay forward and clicks its text
; input. This runs on both the start- and stop-recording presses.

Persistent
CoordMode "Mouse", "Screen"
SetWinDelay 0
SetTitleMatchMode 2

TargetWindow := "Session ahk_exe AbacusAI Listener.exe"
SettingsFile := A_ScriptDir "\settings.ini"
SettingsSection := "listener_composer"
AutomationEnabled := true
NextPressStopsRecording := false

; The Session overlay shifts while recording, so start and stop use separate
; click positions. The stop position defaults lower than the start position.
StartXRatio := ReadRatio("start_x_ratio", 0.50)
StartYRatio := ReadRatio("start_y_ratio", 0.82)
StopXRatio := ReadRatio("stop_x_ratio", 0.50)
StopYRatio := ReadRatio("stop_y_ratio", 0.92)

A_TrayMenu.Add()
A_TrayMenu.Add("Mouse 5 focus enabled (Ctrl+Alt+F7)", ToggleAutomation)
A_TrayMenu.Check("Mouse 5 focus enabled (Ctrl+Alt+F7)")
A_TrayMenu.Add("Focus Listener Session", FocusListenerOnly)
A_TrayMenu.Add("Calibrate start position (Ctrl+Alt+F8)", CalibrateComposer.Bind("start"))
A_TrayMenu.Add("Calibrate stop position (Ctrl+Alt+Shift+F8)", CalibrateComposer.Bind("stop"))
A_TrayMenu.Add("Open script folder", OpenScriptFolder)
A_TrayMenu.Default := "Mouse 5 focus enabled (Ctrl+Alt+F7)"
A_IconTip := "Abacus Listener voice focus: enabled"

; The tilde makes this a pass-through hotkey: Superwhisper still receives the
; original physical Mouse Button 5 event without any synthetic relay.
~XButton2:: {
    global AutomationEnabled, NextPressStopsRecording

    if AutomationEnabled {
        if NextPressStopsRecording
            FocusListenerComposer("stop")
        else
            FocusListenerComposer("start")
    }

    ; Track Superwhisper's physical toggle even while this script is disabled.
    NextPressStopsRecording := !NextPressStopsRecording
}

; Enable or disable only this script's focus/click behavior. Mouse Button 5
; continues to pass through to Superwhisper in either state.
^!F7::ToggleAutomation()

; Save separate coordinates for the normal and recording-state layouts.
^!F8::CalibrateComposer("start")
^!+F8::CalibrateComposer("stop")

; Test Listener focus without starting or stopping Superwhisper.
^!F9::FocusListenerOnly()

ToggleAutomation(*) {
    global AutomationEnabled

    AutomationEnabled := !AutomationEnabled
    if AutomationEnabled {
        A_TrayMenu.Check("Mouse 5 focus enabled (Ctrl+Alt+F7)")
        A_IconTip := "Abacus Listener voice focus: enabled"
        ShowTip("Abacus Listener Mouse 5 focus: ON", 2200)
    } else {
        A_TrayMenu.Uncheck("Mouse 5 focus enabled (Ctrl+Alt+F7)")
        A_IconTip := "Abacus Listener voice focus: disabled"
        ShowTip("Abacus Listener Mouse 5 focus: OFF", 2200)
    }
}

FocusListenerOnly(*) {
    FocusListenerComposer("start")
}

FocusListenerComposer(position) {
    global TargetWindow, StartXRatio, StartYRatio, StopXRatio, StopYRatio

    if !EnsureListenerSessionActive()
        return false

    try WinGetClientPos &clientX, &clientY, &clientWidth, &clientHeight, TargetWindow
    catch as caughtError {
        ShowTip("Could not read the Listener Session position.`n" caughtError.Message, 3500)
        return false
    }

    if position = "stop" {
        xRatio := StopXRatio
        yRatio := StopYRatio
    } else {
        xRatio := StartXRatio
        yRatio := StartYRatio
    }

    clickX := clientX + Round(clientWidth * xRatio)
    clickY := clientY + Round(clientHeight * yRatio)

    MouseGetPos &oldMouseX, &oldMouseY
    Click clickX, clickY
    Sleep 80
    MouseMove oldMouseX, oldMouseY, 0
    return true
}

EnsureListenerSessionActive() {
    global TargetWindow

    if !WinExist(TargetWindow) {
        ShowTip("Abacus Desktop Listener window 'Session' is not open.", 3500)
        return false
    }

    try {
        if WinGetMinMax(TargetWindow) = -1
            WinRestore TargetWindow
        WinActivate TargetWindow
    } catch as caughtError {
        ShowTip("Could not activate Listener Session.`n" caughtError.Message, 4000)
        return false
    }

    if !WinWaitActive(TargetWindow, , 4) {
        ShowTip("Listener Session did not receive focus.", 3500)
        return false
    }

    return true
}

CalibrateComposer(position, *) {
    global TargetWindow, SettingsFile, SettingsSection
    global StartXRatio, StartYRatio, StopXRatio, StopYRatio

    if !WinActive(TargetWindow) {
        ShowTip("Open Listener Session, point at the desired input position, then retry.", 4500)
        return
    }

    MouseGetPos &mouseX, &mouseY
    try WinGetClientPos &clientX, &clientY, &clientWidth, &clientHeight, TargetWindow
    catch as caughtError {
        ShowTip("Could not read the Listener Session position.`n" caughtError.Message, 3500)
        return
    }

    if mouseX < clientX || mouseX > clientX + clientWidth
        || mouseY < clientY || mouseY > clientY + clientHeight {
        ShowTip("The pointer must be inside the Listener Session window.", 3000)
        return
    }

    capturedXRatio := (mouseX - clientX) / clientWidth
    capturedYRatio := (mouseY - clientY) / clientHeight

    if position = "stop" {
        StopXRatio := capturedXRatio
        StopYRatio := capturedYRatio
        xKey := "stop_x_ratio"
        yKey := "stop_y_ratio"
        positionLabel := "Stop-recording"
    } else {
        StartXRatio := capturedXRatio
        StartYRatio := capturedYRatio
        xKey := "start_x_ratio"
        yKey := "start_y_ratio"
        positionLabel := "Start-recording"
    }

    try {
        IniWrite Format("{:.6f}", capturedXRatio), SettingsFile, SettingsSection, xKey
        IniWrite Format("{:.6f}", capturedYRatio), SettingsFile, SettingsSection, yKey
    } catch as caughtError {
        ShowTip("Could not save the composer position.`n" caughtError.Message, 4000)
        return
    }

    ShowTip(positionLabel " position saved.", 2200)
}

ReadRatio(key, fallback) {
    global SettingsFile, SettingsSection

    try value := IniRead(SettingsFile, SettingsSection, key, fallback)
    catch
        return fallback

    if !IsNumber(value)
        return fallback

    value := value + 0
    return value > 0 && value < 1 ? value : fallback
}

OpenScriptFolder(*) {
    Run 'explorer.exe "' A_ScriptDir '"'
}

ShowTip(message, duration := 2500) {
    ToolTip message
    SetTimer HideTip, -duration
}

HideTip() {
    ToolTip
}
