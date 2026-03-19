# pi-display

Raspberry Pi kiosk display setup for `pi3-5`.

This repo captures the working local-display configuration:

- `bash_profile`: starts the Wayland session on `tty1`
- `labwc/rc.xml`: disables non-touch pointer devices and keeps touch enabled
- `labwc/autostart`: launches Chromium in kiosk mode
- `chromium/hide-cursor-extension/`: page-level cursor hiding extension

Target URL:

- `http://jetson-orin-nano.swordfish-kelvin.ts.net:5000/kiosk`

Apply on the Pi as user `pi3-5`:

```sh
cp bash_profile ~/.bash_profile
mkdir -p ~/.config/labwc ~/.config/chromium/hide-cursor-extension
cp labwc/rc.xml ~/.config/labwc/rc.xml
cp labwc/autostart ~/.config/labwc/autostart
chmod 755 ~/.config/labwc/autostart
cp chromium/hide-cursor-extension/manifest.json ~/.config/chromium/hide-cursor-extension/manifest.json
cp chromium/hide-cursor-extension/content.js ~/.config/chromium/hide-cursor-extension/content.js
sudo systemctl restart getty@tty1
```
