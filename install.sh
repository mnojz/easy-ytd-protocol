#!/bin/bash

set -e 

echo -e "\e[34m==================[ YTD-Installer ]===================\e[0m"
echo " ===> installing dependencies ...            "
sudo pacman -S --needed --noconfirm yt-dlp ffmpeg
echo " ===> dependencies installed ...\n"

echo -e "\e[34m==================[ Copying files ]===================\e[0m"
mkdir -p $HOME/.local/bin
cp ytd.py ~/.local/bin/
echo " ===> files copied ...\n"

echo -e "\e[34m===========[ Generating URL handler file ]============\e[0m"

SCRIPT_PATH="$HOME/.local/bin/ytd.py"

echo "[Desktop Entry]
Name=YTD
Type=Application
Exec=/usr/bin/python3 $SCRIPT_PATH %u
StartupNotify=false
MimeType=x-scheme-handler/ytd;" > $HOME/.local/share/applications/ytd-handler.desktop

echo " ===> URL handler file generated ..."

xdg-mime default ytd-handler.desktop x-scheme-handler/ytd

echo " ===> URL handler set ...\n"

echo -e "\e[31m==================[ Important ]===================\e[0m"
echo -e "\e[31myou have to install browser extension manually\e[0m"
