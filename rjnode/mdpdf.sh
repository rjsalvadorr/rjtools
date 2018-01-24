#!/usr/bin/env sh

# Check if NodeJS is usable.
if node --version | grep -q 'not found'; then
  echo "Node JS is required, but not found!"
  exit 1
fi

# Check if markdown-pdf is usable.
if markdown-pdf --version | grep -q 'not found'; then
  echo "The markdown-pdf package isn't found. Attempting to install..."
  npm install -g markdown-pdf
fi

# Check if a filename has been given.
if [ -z "$1" ]
  then
    echo "No filename given!"
	exit 1
fi

echo "===== Converting" $1 "to a PDF"

markdown-pdf --paper-format Letter --css-path ./mdpdf.css --paper-border 0.5in $1

echo "===== Conversion done"
exit 0
