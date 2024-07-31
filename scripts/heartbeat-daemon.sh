#!/usr/bin/zsh

while true; do
    python -m heartbeat --friday-endpoint http://localhost:3000 --friday-namespace heartbeat --friday-topic laptop
    sleep 5
done