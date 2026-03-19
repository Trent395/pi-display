# Launch kiosk on tty1.
if [ "$(tty)" = "/dev/tty1" ]; then
  export XCURSOR_THEME=blank
  export XCURSOR_SIZE=24
  exec dbus-run-session labwc
fi
