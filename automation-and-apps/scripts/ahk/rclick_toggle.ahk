#Requires AutoHotkey v2.0
#SingleInstance Force

dx := 71, dy := 151     ; (1088-1017, 742-591)
gap := 10               ; ms between steps
back := false           ; true = return cursor to original spot after

XButton1:: {
    Click("Right")
    Sleep(gap)
    MouseMove(dx, dy, 0, "R")
    Sleep(gap)
    Click("Left")
    if back
        MouseMove(-dx, -dy, 0, "R")
}
