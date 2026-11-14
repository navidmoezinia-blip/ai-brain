#Requires AutoHotkey v2.0
#SingleInstance Force

Esc::Send("{``}")
+Esc::Send("~")
^Esc::Send("{Esc}")     ; Ctrl+Esc = real Escape
