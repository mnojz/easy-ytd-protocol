# youtube downloader script with ytd protocol

this project contains 3 things,

- custom url protocol (ytd://)
- simplified yt-dlp downloader script.
- browser extension for download button

## 1. ytd:// protocol

this is custom protocol that is going to be added to windows registry inorder to function properly when `ytd:` is typed on browser url bar.
this protocol execute a `ytd.py` script present somewhere inside user directory, or you can specify your own directory also by passing the url after ytd:
like this: `ytd:https://www.youtube.com/watch?v=xyz`

this whole thing is passed into the script and then script will parse the url clean it up and do rest of the steps.

## 2. ytd.py script

this script contain yt-dlp library that handle all the downloading stuff, download part is spearated into 2 function, one is responsible to download audio only, another is responsible to download best video upto 1080p with best audio you can change the 1080p part in the script if you have different requirement.

## 3. browser extension

this extension is supposed to inject code inside youtube page that hide the original download button and put custom download button with ytd-download text in it. upon clicking a small popup is visible with 2 options to choose we can choose any one of them or both. if required. options are `audio-only` and `video` `audio-only` will download a audio of that youtube video in mp3 format, `video` will download best audio with best audio
if both are selected 2 files will be downloaded both mp3 audio file and mp4 (probably) video.

# how to set this up

## prerequisits

### 1. python installed

goto [python.org](https://www.python.org/) click on download and download the latest version of python.
after download complete run the python setup check `Add to Path` option while installing

### 2. yt-dlp library installed

after python is completely installed, open windows terminal and type the following command
`pip install yt-dlp`

### 3. FFMPEG installed

after yt-dlp is installed install ffmpeg, you can do this in multiple ways but for simplicity i recommand using winget to install ffmpeg, open windows terminal and type the following command
`winget install ffmpeg`

### before going to installation part check if everything you have done so far is working or not,

open terminal and
type `yt-dlp --version` if you are getting version that look like a date you are good to go
now ytpe `ffmpeg -version` if you are getting long text starting with version info you are good to go. you may proceed to installation part, if you are getting error during above verification try getting help online.

## installation

### 1. setup ytd: protocol first

clone this repository you will get 2 folders inside `ydl` and `ydl_protocol` ydl one is unpacked browser extension
ydl_protocol one is consist of both registry file and downloader python script

we have to place the `ytd_protocol` folder inside home directory.
press `WIN+R` and enter `%userprofile%` and you have to put the ytd_protocol folder in that directory. then open the ytd_protol folder open ytd.reg file with notepad or any of your favorite code editor. you have to edit the path to ytd.py file you need to set the \<userprofile> to your own user directory name. now run the ytd.reg file click ok if prompted.

to check if it is working or not, open browser and put ytd: in url bar if terminal window is opening it is working.

### 2. setup browser extension

copy the ytd folder to your desired location, open browser, goto extension page enable developer option, new options will appear now, click on load unpacked option and select the ytd folder the extension will be installed, note: this extension is for chromium based browser, firefox based browser will not work.

to check goto youtube open any video or song, refresh the video page, now ytd-download button will appear next to share button click on it and click on download,

if video is downloading congratulation,
otherwise, throw everything you just did to garbage, and go for better tools like stacher.io for downloading not only youtube but many other websites easily,

browser extension is under construction so you might need to refresh the page if ytd-download button is not showing
