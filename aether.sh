#!/bin/bash
# bash generate random alphanumeric string
#

# prevent error tr: Illegal byte sequence
export LC_CTYPE=C

# bash generate random 8 character alphanumeric string (upper and lowercase) 
NEW_UUID=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 7 | head -n 1)

# bash write UUID to .env file
var="UUID=${NEW_UUID}"
destfile=.env

# remove one line if UUID is exist
awk '!/UUID/' $destfile > tmpfile && mv tmpfile $destfile

# write UUID in .env file
if [ -f "$destfile" ]
then
		printf "%s" "$var" >> "$destfile"
fi

# example of create directory with uuid as dirname
# this script will always create new directory, and abandoned the previous one
# destdir=./static/$NEW_UUID
# mkdir -p $destdir

# copy all directories under .next/ into destdir/.next after NPM RUN BUILD

# this flow should be copied from docker images into GCS
# cp -R .next/ $destdir/.next/