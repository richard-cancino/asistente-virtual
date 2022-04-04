#!/bin/bash
sudo su -
# Go to app folder
cd /home/ubuntu/Sites/essalud-be/asistente-virtual

# stop running process
sudo pm2 stop all