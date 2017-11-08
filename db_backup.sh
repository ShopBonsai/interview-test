#!/bin/bash
TODAYS_DATE=`date "+%Y-%m-%d-%T"`
FILE_NAME="DATE"
DB="interview"
BACKUP_PATH="./${TODAYS_DATE}"
MONGOBIN_PATH="$(which mongodump)"
$MONGO_BIN -d $DB
mkdir -p $BACKUP_PATH && mongodump --out $BACKUP_PATH
