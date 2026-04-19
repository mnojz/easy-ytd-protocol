#!/bin/bash
set -euo pipefail

section() {
    echo -e "\n\e[34m==================[ $1 ]===================\e[0m"
}

section "Installing dependencies"
sudo pacman -S --needed --noconfirm yt-dlp ffmpeg python

section "Installing script"

SCRIPT_DIR="$HOME/.local/bin"
SCRIPT_PATH="$SCRIPT_DIR/ytd.py"

mkdir -p "$SCRIPT_DIR"

if [ -f "./ytd.py" ]; then
    cp "./ytd.py" "$SCRIPT_PATH"
    chmod +x "$SCRIPT_PATH"
else
    echo "[ERROR] ytd.py not found in current directory"
    exit 1
fi

section "Creating desktop handler"

DESKTOP_FILE="$HOME/.local/share/applications/ytd-handler.desktop"
mkdir -p "$(dirname "$DESKTOP_FILE")"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=YTD
Type=Application
Exec=/usr/bin/env python3 $SCRIPT_PATH %u
StartupNotify=false
MimeType=x-scheme-handler/ytd;
EOF

section "Registering MIME handler"

xdg-mime default ytd-handler.desktop x-scheme-handler/ytd
update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true

section "Done"

echo -e "\e[31mRemember: browser extension must be installed manually\e[0m"
