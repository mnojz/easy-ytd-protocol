import sys
import yt_dlp
import subprocess
from urllib.parse import parse_qs, urlparse, urlunparse

def clean_url(url):    
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    
    query_params.pop('audio', None)
    query_params.pop('video', None)
    
    clean_query = '&'.join(f'{key}={value[0]}' for key, value in query_params.items())
    clean_url = urlunparse(parsed_url._replace(query=clean_query))
    
    return clean_url
def downloadAudio(url):
    ydl_opts = {
        'outtmpl': 'C:\\Users\\Manoj\\Downloads\\%(title)s_audio.%(ext)s',
        'format': 'bestaudio[ext=m4a]',
        'extract-audio': True,
        'audio-format': 'mp3',
        'audio-quality': 0,
        'no-playlist': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])        
def downloadVideo(url):
    ydl_opts = {
        'outtmpl': 'C:\\Users\\Manoj\\Downloads\\%(title)s.%(ext)s',
        'format': 'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best', 
        'no-playlist': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

def main():    
    if len(sys.argv) > 1:
        url = sys.argv[1][4:]
    else:
        print("No URL received!")
        return

    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    
    audio_only = query_params.get("audio", ["false"])[0].lower() == "true"
    video = query_params.get("video", ["false"])[0].lower() == "true"

    print(f"Audio Only: {audio_only}")
    print(f"Video: {video}")

    url = clean_url(url)
    print(f"Cleaned URL: {url}")

    # Download based on flags
    if audio_only and video:
        downloadVideo(url)
        downloadAudio(url)
    elif audio_only:
        downloadAudio(url)
    elif video:
        downloadVideo(url)

    command = "cd C:\\Users\\Manoj\\Downloads && explorer ."
    subprocess.run(command, shell=True)
    
    sys.exit(0)

if __name__ == "__main__":
    main()
