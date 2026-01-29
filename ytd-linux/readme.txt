1. copy ytd.py to .local/bin/
2. add execution permission to ytd.py
3. copy ytd-handler.desktop to .local/share/applications/
4. run this command in terminal
"xdg-mime default ytd-handler.desktop x-scheme-handler/ytd"
5. to verify if the protocol is installed or not run this command
"xdg-mime query default x-scheme-handler/ytd"
6. you will get result like this
"ytd-handler.desktop"
