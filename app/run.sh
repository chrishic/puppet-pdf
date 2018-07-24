#!/bin/bash
set -e

export APP_ENV="${APP_ENV:-default}"
export NODE_ENV=$APP_ENV

SERVICE_NAME="puppet-pdf"
LOG_PATH="/var/app/$SERVICE_NAME/shared/logs"

# Create directory structure for log files
mkdir -p $LOG_PATH

APP_LOG_FILENAME="$LOG_PATH/$SERVICE_NAME.log"

# If there is an existing log file, save it (by renaming)
if [ -f "$APP_LOG_FILENAME" ]; then
    # Get the current date/time stamp
    d=$(date '+%y-%m-%d_%H-%M-%S')
    mv $APP_LOG_FILENAME $LOG_PATH/$SERVICE_NAME_$d.log
fi

# Start our service
cd /var/app/$SERVICE_NAME/app/tools
node index.js --name=$SERVICE_NAME >> $APP_LOG_FILENAME 2>&1
