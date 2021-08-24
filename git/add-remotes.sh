#!/bin/bash
# purpose: add all remotes for repo
# author: Jeff Reeves

# define repository's stub for the URL
REPO_STUB='socket.io-example'

# create the repo directory on bridges
ssh git@bridges "mkdir /git/socket.io-example.git && cd /git/socket.io-example.git && git config --global init.defaultBranch main && git init --bare && sed -i 's/master/main/' /git/rpi4-custom-os.git/HEAD"

# add bridges to git remote list
git remote add bridges git@bridges:/git/socket.io-example.git

# add gitlab to git remote list
git remote add gitlab git@gitlab.com:JeffReeves/socket.io-example.git

# add github to git remote list
git remote add github git@github.com:JeffReeves/socket.io-example.git

# update origin to bridges
git remote set-url origin git@bridges:/git/socket.io-example.git

# view all remotes
git remote -v

# open settings for gitlab and github in browser
#explorer.exe "https://gitlab.com/JeffReeves/socket.io-example/-/settings/repository"
#explorer.exe "https://gitlab.com/JeffReeves/socket.io-example/-/branches"
#explorer.exe "https://github.com/JeffReeves/socket.io-example/settings/branches"
#explorer.exe "https://github.com/JeffReeves/socket.io-example/branches"

