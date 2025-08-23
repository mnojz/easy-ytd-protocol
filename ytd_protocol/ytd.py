import os
import sys
import yt_dlp
import subprocess
from urllib.parse import parse_qs, urlparse, urlunparse

def clean_url(url):
    # Step 1: Remove the 'ytd:' prefix
    if url.startswith("ytd:"):
        url = url[4:]

    # Step 2: Find the position of '&' and slice the URL up to that point
    query_pos = url.find('&')
    if query_pos != -1:
        url = url[:query_pos]  # Only keep the part before the first '&'
    
    return url


def downloadAudio(url):
    download_dir = os.path.join(os.path.expanduser('~'), 'Downloads', '%(title)s_audio.%(ext)s')
    ydl_opts = {
        'outtmpl': download_dir,
        'format': 'bestaudio',        
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '0',
        }]
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])        

def downloadVideo(url):
    download_dir = os.path.join(os.path.expanduser('~'), 'Downloads', '%(title)s_video.%(ext)s')
    ydl_opts = {
        'outtmpl': download_dir,
        'format': 'bestvideo[height<=1080][height>=720]+bestaudio/bestvideo[height<=1080]+bestaudio/best',
        'merge_output_format': 'mp4',  # ensures proper muxing
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


def main():    
    if len(sys.argv) > 1:
        url = sys.argv[1]
        if url.startswith("ytd://"):
            url = url[4:]
    else:
        print("No URL received!")
        sys.exit(1)

    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    
    audio_only = query_params.get("audio", ["false"])[0].strip().lower() == "true"
    video = query_params.get("video", ["false"])[0].strip().lower() == "true"

    print(f"Audio Only: {audio_only}")
    print(f"Video: {video}")

    url = clean_url(url)
    print(f"Cleaned URL: {url}")

    # Download based on flags
    try:
        if audio_only and video:
            downloadVideo(url)
            downloadAudio(url)
        elif audio_only:
            downloadAudio(url)
        elif video:
            downloadVideo(url)
    except yt_dlp.DownloadError as e:
        print(f"Download error: {e}")
        input("Press Enter to continue...")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        input("Press Enter to continue...")
        sys.exit(1)

    downloads_dir = os.path.expanduser('~\\Downloads')
    # subprocess.run(["explorer", downloads_dir])
    
    # input("Press Enter to continue...")
    sys.exit(0)

if __name__ == "__main__":
    main()
