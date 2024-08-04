#!/usr/bin/zsh

while true; do
    OUTPUT=$(S_TIME_FORMAT=ISO mpstat -P ALL 5 1 -o JSON | jq '{date: .sysstat.hosts.[0].date} + .sysstat.hosts.[0].statistics.[0]')
    echo $OUTPUT > cpu-usage.json
    echo "Wrote cpu usage into cpu-usage.json at $(date)"
done