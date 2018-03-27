#!/usr/bin/env sh

# Check if NodeJS is usable.
# if node --version | grep -q 'not found'; then
#   echo "[ Node JS is required, but not found! ]"
#   exit 1
# fi

# Check if markdown-pdf is usable.
# if mdpdf | grep -q 'not found'; then
#   echo "[ The mdpdf package isn't found. Attempting to install... ]"
#   npm install -s mdpdf
# fi

# Check if a filename has been given.
if [ -z "$1" ]
  then
    echo "#  No filename given!"
	exit 1
fi

echo "#  Converting" $1 "to a PDF"

mdpdf $1 --style ./rjmdpdf.css --border 0.5in

echo "#  Conversion done!"
exit 0
