#!/usr/bin/env sh

# SIMPLE TING
# git log -50 --oneline

# NOT SO SIMPLE TING
git log --pretty=format:'%n%C(yellow)%h%Creset | %s %n         | %C(green)%an%Creset %C(cyan)(%ar, %ai)%Creset'

# TO DECLARE THIS AS A GIT ALIAS:
# $ git config --global alias.custlog "git log --pretty=format:'%n%C(yellow)%h%Creset | %s %n         | %C(green)%an%Creset %C(cyan)(%ar, %ai)%Creset'"
