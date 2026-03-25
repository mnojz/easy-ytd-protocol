# YouTube Downloader Script with `ytd://` Protocol

This project provides a simple way to download YouTube videos using a custom URL protocol, a Python script, and a browser extension.

It includes:

1. **Custom URL protocol (`ytd://`)**
2. **Python downloader script (`ytd.py`)**
3. **Browser extension for a download button**

---

## 1. `ytd://` Protocol

This is a custom URL protocol that allows your browser to trigger the downloader directly.  
When you type `ytd:` in your browser’s address bar, it will run the `ytd.py` script located in `~/.local/bin/`.

---

## 2. `ytd.py` Script

This Python script uses **yt-dlp** to download videos. It supports:

- Video resolutions: `4K`, `2K`, `1080p`, `720p`, `480p`
- Audio format: `MP3`

The script automatically chooses the best available format if you request a higher resolution than the video provides.

---

## 3. Browser Extension

The extension modifies the YouTube interface:

- Hides the original download button
- Adds a custom **Download** button
- Custom button opens small download popup

| Original button                                                                                                                 | Injected button                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ![original download button](https://raw.githubusercontent.com/mnojz/easy-ytd-protocol/refs/heads/main/screenshots/original.png) | ![injected download button](https://raw.githubusercontent.com/mnojz/easy-ytd-protocol/refs/heads/main/screenshots/injected.png) |

---

### download popup

## ![download menu](https://raw.githubusercontent.com/mnojz/easy-ytd-protocol/refs/heads/main/screenshots/downloadMenu.png)

## Installation

### Arch based OS only

```bash
git clone --depth 1 https://github.com/mnojz/easy-ytd-protocol.git && cd easy-ytd-protocol && chmod +x install.sh && ./install.sh
```

### Set up the browser extension

- Copy the `ydl` folder to your desired location.

- Open your Chromium-based browser → Extensions → Enable Developer mode → Load unpacked → Select the ydl folder. extension will get installed

- Go to YouTube, open a video, refresh the page. You’ll see a Custom Download button next to the Share button.

- now you can download any video in any format

  NOTE: if you are using firefox you can download extension [here](https://addons.mozilla.org/en-US/firefox/addon/download-button-injector/)
  firefox extension sometime dont inject the download button unless video page is refreshed. so chromium is recommanded.

---

### conclusion

**If it works congratulation 🎉**

if not, double-check the setup or use other better tools like:

- Stacher.io (app)
- Cobalt.tools (webapp)

for hasselfree downloads.

---

**Note:** This is a hobby project. Bugs may exist, and new features might not be added 😎

# have fun 🎈🎉
