#!/usr/bin/env sh

echo "rjtools..."

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
USER_DIR="$( pwd )"
NODE_DIR=$SCRIPT_DIR"/node"

echo "SCRIPT_DIR" $SCRIPT_DIR
echo "USER_DIR  " $USER_DIR
echo "NODE_DIR  " $NODE_DIR

if [ "$USER_DIR" != "$NODE_DIR" ]
then
    echo "OTHER TING!"
    cd $NODE_DIR
    npm run start-electron
else
    echo "SAME TING!"
    npm run start-electron
fi
