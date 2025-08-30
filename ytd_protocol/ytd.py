import os
import sys
import yt_dlp
from urllib.parse import parse_qs, urlparse

def clean_url(url):
    # Remove custom prefix
    for prefix in ("ytd://", "ytd:"):
        if url.startswith(prefix):
            url = url[len(prefix):]
            break

    # remove all the query parameter after the & sign that include playlist code and rest. 
    ampersand_pos = url.find('&')
    if ampersand_pos != -1:
        url = url[:ampersand_pos]

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
            "sd":  "bv*[height<=480]+ba/bv*+ba/b",
            "hd":  "bv*[height<=720]+ba/bv*+ba/b",
            "fhd": "bv*[height<=1080]+ba/bv*+ba/b",
            "qhd": "bv*[height<=1440]+ba/bv*+ba/b",
            "uhd": "bv*[height<=2160]+ba/bv*+ba/b",
        }

        fmt = format_map.get(mediaFormat.lower())
        print(f"fmt value: {fmt}")

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
    if len(sys.argv) <= 1:
        print("No URL received!")
        sys.exit(1)

    url = sys.argv[1]
    print(f"original URL: {url}")
    cleaned_url = clean_url(url)
    print(f"cleaned URL: {cleaned_url}")

    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    media_format = query_params.get("format", ["fhd"])[0].strip().lower()
    print(f"media format: {media_format}")

    fmt_map = {
        "uhd": "2160p (4K)",
        "qhd": "1440p (2k)",
        "fhd": "1080p",
        "hd": "720p",
        "sd": "480p",
        "audio": "Audio only"
    }

    display_format = fmt_map.get(media_format, media_format)
    print(f"Format: {display_format}")


    try:
        downloadMedia(cleaned_url, media_format)
    except yt_dlp.DownloadError as e:
        print(f"Download error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

    sys.exit(0)

if __name__ == "__main__":
    main()
