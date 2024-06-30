#!/bin/bash
# shebang is being used to announce the program is running on bash interpreter

# Wait for the GUI to fully load
sleep 10

# Set DISPLAY for GUI applications
export DISPLAY=:0
export XAUTHORITY=/home/pi/.Xauthority

cd /home/pi/CarConnect

#start the apps
/home/pi/.nvm/versions/node/v21.7.2/bin/node index.js & #need to manually specify installation dir if node was installed by nvm

python3 obdDash.py & #use python instead of python3 so it wont be terminated on restartApps.sh

# Run npm run dev
# npm run dev &

# Launching firefox-browser
# firefox-esr --new-instance --kiosk "http://localhost:5000" &
# firefox-esr -P --new-instance --kiosk --profile "/home/pi/Documents/Profiles/0" "http://localhost:5000" &

