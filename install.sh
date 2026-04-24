#!/bin/bash
set -euo pipefail

log() {
    echo -e "\e[36m[INFO]\e[0m $1"
}

section() {
	echo -e "\n\e[34m================================\e[0m"
	echo -e "\e[32m$1\e[0m"
	echo -e "\e[34m================================\e[0m"
}

section "Installing dependencies"
sudo pacman -S --needed --noconfirm yt-dlp ffmpeg python

section "Installing script"

SCRIPT_DIR="$HOME/.local/bin"
SCRIPT_PATH="$SCRIPT_DIR/ytd.py"

mkdir -p "$SCRIPT_DIR"

if [ -f "./ytd.py" ]; then
    cp "./ytd.py" "$SCRIPT_PATH"
    log "ytd.py copied to $SCRIPT_PATH"
    chmod +x "$SCRIPT_PATH"
    log "ytd.py made executable"
else
    echo "[ERROR] ytd.py not found in current directory"
    exit 1
fi

ICON_DIR="$HOME/.local/share/icons"
ICON_PATH="$ICON_DIR/ytd.svg"   # or .svg if you use svg

mkdir -p "$ICON_DIR"

if [ -f "./ydl/icons/ytd.svg" ]; then
    ICON_PATH="$ICON_DIR/ytd.svg"
    cp "./ydl/icons/ytd.svg" "$ICON_PATH"
    log "SVG icon copied to $ICON_PATH"
else
    log "No icon found, skipping icon setup"
    ICON_PATH=""
fi

log "Creating URL handler"

DESKTOP_FILE="$HOME/.local/share/applications/ytd-handler.desktop"
mkdir -p "$(dirname "$DESKTOP_FILE")"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=YTD
Type=Application
Exec=/usr/bin/env python3 $SCRIPT_PATH %u
StartupNotify=false
MimeType=x-scheme-handler/ytd;
Icon=$ICON_PATH
EOF

log "Desktop entry created at $DESKTOP_FILE"
log "Registering MIME handler"

xdg-mime default ytd-handler.desktop x-scheme-handler/ytd
update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true

log "MIME handler registered for ytd:// URLs"

echo -e "\e[31m browser extension must be installed manually \e[0m"

log "Installation complete! You can now use ytd:// URLs to download videos with yt-dlp."