import sys
import yt_dlp
import subprocess
from urllib.parse import parse_qs, urlparse, urlunparse

def clean_url(url):
    query_pos = url.find('&')    
    if query_pos != -1:
        url = url[:query_pos]
    
    return url

def downloadAudio(url):
    ydl_opts = {
        'outtmpl': 'C:\\Users\\Manoj\\Downloads\\%(title)s_audio.%(ext)s',
        'format': 'bestaudio',
        'extract-audio': True,
        'audio-format': 'mp3',
        'audio-quality': 0,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])        
def downloadVideo(url):
    ydl_opts = {
        'outtmpl': 'C:\\Users\\Manoj\\Downloads\\%(title)s.%(ext)s',
        'format': 'bestvideo[height<=1080]+bestaudio/best[ext=mp4]', 
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
        try:
            downloadVideo(url)
            downloadAudio(url)
        except Exception as e:
            print(f"Error: {e}")
    elif audio_only:
        try:
            downloadAudio(url)
        except Exception as e:
            print(f"Error: {e}")
    elif video:
        try:
            downloadVideo(url)
        except Exception as e:
            print(f"Error: {e}")

    input("Press Enter to continue...")

    command = "cd C:\\Users\\Manoj\\Downloads && explorer ."
    subprocess.run(command, shell=True)
    
    sys.exit(0)

if __name__ == "__main__":
    main()
