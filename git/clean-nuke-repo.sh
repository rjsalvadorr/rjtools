#!/usr/bin/env sh

echo ""
echo " NUCLEAR LAUNCH DETECTED."
echo " Force cleaning the git repository, and clearing the Yarn cache..."
echo ""

git clean -xdf
yarn cache clean

echo ""
echo " BOOOOOOOOM!!!"
echo ""
