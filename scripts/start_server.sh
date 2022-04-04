#!/bin/bash
sudo su -
# Go to app folder
cd /home/ubuntu/Sites/essalud-be/asistente-virtual

# Copy env variables from bucket and start the app
eval $(aws --region us-east-1 s3 cp s3://essalud-codedeploy-deployment-envs/env.txt - | sed 's/\r$//' - | sed 's/^/export /') && pm2 start essalud --update-env
