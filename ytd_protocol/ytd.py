import os
import sys
import yt_dlp
from urllib.parse import parse_qs, urlparse

def clean_url(url):
    # Remove the 'ytd:' prefix if present
    if url.startswith("ytd:"):
        url = url[4:]

    # Keep only before first '&'
    query_pos = url.find('&')
    if query_pos != -1:
        url = url[:query_pos]
    
    return url

def downloadMedia(url, mediaFormat):
    home = os.path.expanduser('~')

    # Audio case
    if mediaFormat.lower() == "audio":
        download_dir = os.path.join(home, 'Music', '%(title)s.%(ext)s')
        ydl_opts = {
            'outtmpl': download_dir,
            'format': 'bestaudio',
            'restrictfilenames': True,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '0',
            }]
        }
    else:
        # Video case → save to Videos folder
        download_dir = os.path.join(home, 'Videos', f'%(title)s_{mediaFormat}.%(ext)s')

        format_map = {
            "sd":  "bestvideo[height<=480]+bestaudio/best[height<=480]",
            "hd":  "bestvideo[height<=720]+bestaudio/best[height<=720]",
            "fhd": "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
            "qhd": "bestvideo[height<=1440]+bestaudio/best[height<=1440]",
            "uhd": "bestvideo[height<=2160]+bestaudio/best[height<=2160]",
        }

        fmt = format_map.get(mediaFormat.lower())
        if not fmt:
            raise ValueError(f"Unknown format: {mediaFormat}")

        ydl_opts = {
            'outtmpl': download_dir,
            'format': fmt,
            'merge_output_format': 'mp4',
            'restrictfilenames': True,
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
        
    mediaFormat = query_params.get("format", ["fhd"])[0].strip().lower()

    print(f"Format: {mediaFormat}")

    url = clean_url(url)
    print(f"Cleaned URL: {url}")

    try:
        downloadMedia(url, mediaFormat)
    except yt_dlp.DownloadError as e:
        print(f"Download error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)
    
    sys.exit(0)

if __name__ == "__main__":
    main()
