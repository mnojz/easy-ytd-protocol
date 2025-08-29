# youtube downloader script with ytd protocol

this project contains 3 things,

- custom url protocol (ytd://)
- simplified yt-dlp downloader script.
- browser extension for download button

## 1. ytd:// protocol

this is custom protocol that is going to be added to windows registry inorder to function properly when `ytd:` is typed on browser url bar.
this protocol execute a `ytd.py` script present inside `c:\ytd-protocol`.


## 2. ytd.py script

this script contain yt-dlp library that handle all the downloading stuff, it can download all the most common formats i.e. `4k`, `2k`, `1080p`, `720p`, `480p` and `mp3` 

## 3. browser extension

this extension is supposed to inject code inside youtube page that hide the original download button and put custom download button with just download text in it with no icon. upon clicking a small popup is visible with all format options to choose we can choose any one of them. if you select option with higher resolution than that of original video the script will choose the best available format autometically.

# how to set this up

## prerequisits

### 1. python installed

goto [python.org](https://www.python.org/) click on download and download the latest version of python.
after download complete run the python setup check `Add to Path` option while installing

### 2. yt-dlp library installed

after python is completely installed, open windows terminal and type the following command
`pip install yt-dlp`
if it ask you to update pip do so as shown in the terminal. 

### 3. FFMPEG installed

after yt-dlp is installed install ffmpeg, you can do this in multiple ways but for simplicity i recommand using winget to install ffmpeg, open windows terminal and type the following command
`winget install ffmpeg` if you get any problem with winget version, you can go for manual download [ffmpeg](https://github.com/BtbN/FFmpeg-Builds/releases) download the correct build for windows, 
then extract files to somewhere safe and permanent, then add binaries to the environment variable. 

### before going to installation part check if everything you have done so far is working or not,

open terminal and
type `yt-dlp --version` if you are getting version that look like a date you are good to go
now ytpe `ffmpeg -version` if you are getting long text starting with version info you are good to go. you may proceed to installation part, if you are getting error during above verification try getting help online.

## installation

### 1. setup ytd: protocol first

clone this repository you will get 2 folders inside `ydl` and `ydl_protocol` ydl one is unpacked browser extension
ydl_protocol one is consist of both registry file and downloader python script

we have to place the `ytd_protocol` folder inside root directory.
you have to put the ytd_protocol folder in `c:\` directory. now run the ytd.reg file click ok if prompted.

to check if it is working or not, open browser and put ytd: in url bar if terminal window is opened and closed then you are good to go. 

### 2. setup browser extension

copy the ytd folder to your desired location, open browser, goto manage extension page enable developer option, new options will appear now, click on load unpacked option and select the ytd folder the extension will be installed, note: this extension is for chromium based browser, firefox based browser will not support this expension.

to check goto youtube open any video or song, refresh the video page, now download button with no icon inside will appear next to share button click on it and click on download,

if video is downloading congratulation,
otherwise, you made mistake at some point, either try again or go for better tools like stacher.io or cobalt.tools for downloading it works not only on youtube but many other websites easily,

Note: this is just a hobby project so i might not be able to fix any bugs or add features unless my mood say so. 

# have a good day. 


