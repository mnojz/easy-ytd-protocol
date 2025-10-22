# YouTube Downloader Script with `ytd://` Protocol

This project provides a simple way to download YouTube videos using a custom URL protocol, a Python script, and a browser extension.

It includes:

1. **Custom URL protocol (`ytd://`)**
2. **Python downloader script (`ytd.py`)**
3. **Browser extension for a download button**

---

## 1. `ytd://` Protocol

This is a custom URL protocol that allows your browser to trigger the downloader directly.  
When you type `ytd:` in your browser’s address bar, it will run the `ytd.py` script located in `C:\ytd-protocol`.

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
- Adds a custom **Download** button (no icon)
- Clicking it opens a small popup with format options

| Original button                                                                                                                 | Injected button                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ![original download button](https://raw.githubusercontent.com/mnojz/easy-ytd-protocol/refs/heads/main/screenshots/original.png) | ![injected download button](https://raw.githubusercontent.com/mnojz/easy-ytd-protocol/refs/heads/main/screenshots/injected.png) |

---

### download popup

## ![download menu](https://raw.githubusercontent.com/mnojz/easy-ytd-protocol/refs/heads/main/screenshots/downloadMenu.png)

## Setup Guide

### Prerequisites

1. **Python**

   - Download from [python.org](https://www.python.org/)
   - During installation, check **Add Python to PATH**

2. **yt-dlp**

   - Open terminal and run:

     ```bash
     pip install yt-dlp
     ```

   - Update yt-dlp if already installed
     ```bash
     pip install -U yt-dlp
     ```
   - Update pip if prompted as shown in message.

3. **FFmpeg**
   - Easiest way:
     ```bash
     winget install ffmpeg
     ```
   - Or download manually from [FFmpeg Builds](https://github.com/BtbN/FFmpeg-Builds/releases)
   - Extract and add the binaries to your PATH.

### Verify installation:

```bash
yt-dlp --version
ffmpeg -version
```

If both commands show version info, you’re ready.

## Installation

1. **Set up the `ytd://` protocol**

   - Clone this repository. You’ll get two folders: **ydl** (browser extension) and **ytd_protocol** (Python script + registry file).

   - Move ydl_protocol folder to root directory `C:\`

   - Run `ytd.reg` inside that folder and confirm any prompts.

   - Test: type `ytd:` in your browser’s address bar. If a terminal briefly opens, it works.

2. **Set up the browser extension**

   - Copy the `ydl` folder to your desired location.

   - Open your Chromium-based browser → Extensions → Enable Developer mode → Load unpacked → Select the ydl folder. extension will get installed

   - Go to YouTube, open a video, refresh the page. You’ll see a Download button (without icon) next to the Share button.

   - now you can download any video in any format
---
### conclusion

**If it works congratulation 🎉** 

if not, double-check the setup or use other better tools like:
- Stacher.io (app)
- Cobalt.tools (webapp)

for hasselfree downloads.

---

**Note:** This is a hobby project. Bugs may exist, and new features might not be added, if you want to contribute you're welcome, if you want to fork it you are welcome again. 😎

# have fun 🎈🎉
