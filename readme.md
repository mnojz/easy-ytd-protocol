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
   - on linux pyhon3 is preinstalled in most cases.
     ```bash
     sudo apt install python3
     ```

2. **yt-dlp**
   - **yt-dlp** binary is required to be side by side of **ytd.py**

     ```bash
     sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O ~/.local/bin/yt-dlp && sudo chmod a+rx ~/.local/bin/yt-dlp
     ```

3. **FFmpeg**
   - For **Ubuntu** based distros.
     ```bash
     sudo add-apt-repository ppa:ubuntuhandbook1/ffmpeg8
     sudo apt update
     sudo apt install ffmpeg
     ```
   - For **Arch** based distros.
     ```bash
     sudo pacman -S ffmpeg
     ```

### Verify installation:

```bash
yt-dlp --version
ffmpeg -version
```

If both commands show version info, you’re ready.

## Installation

1. **Set up the `ytd://` protocol**
   - Ccopy `ytd-handler.desktop` to `~/.local/share/applications/`
   - run this command in terminal

     ```bash
     xdg-mime default ytd-handler.desktop x-scheme-handler/ytd
     ```

   - to verify if the protocol is installed or not run this command
     ```bash
     xdg-mime query default x-scheme-handler/ytd
     ```
   - you will get result like this `ytd-handler.desktop`

2. **setup the downloader script**
   - copy `ytd.py` to `~/.local/bin/`

3. **Set up the browser extension**
   - Copy the `ydl` folder to your desired location.

   - Open your Chromium-based browser → Extensions → Enable Developer mode → Load unpacked → Select the ydl folder. extension will get installed

   - Go to YouTube, open a video, refresh the page. You’ll see a Download button (without icon) next to the Share button.

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
