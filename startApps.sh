#!/bin/bash
# shebang is being used to announce the program is running on bash interpreter

cd /home/pi/CarConnect

#start the apps
/home/pi/.nvm/versions/node/v21.7.1/bin/node index.js & #need to manually specify installation dir if node was installed by nvm

python3 obdDash.py & #use python instead of python3 so it wont be terminated on restartApps.sh

# Run npm run dev
npm run dev &

# # Launching chromium-browser 
# chromium-browser --enable-chrome-browser-cloud-management --window-position=0,0    --kiosk --user-data-dir="/home/pi/Documents/Profiles/0" http://localhost:5000 &

# Launching firefox-browser
firefox --new-instance --kiosk --profile "/home/pi/Documents/Profiles/0" "http://localhost:5000" &


# # Used in Unix-like operating systems to hide the mouse cursor when it's not in use
# unclutter -idle 1 &