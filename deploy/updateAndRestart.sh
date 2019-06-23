#!/bin/bash

# any future command that fails will exit the script
# set -e

# Delete the old repo
# rm -rf /garbage-hunter

# go the project folder
cd garbage-hunter

# down the docker compose
sudo docker-compose down

# checkout to master branch
# git checkout master
git checkout master

# pull the new code
# git pull origin master
git pull origin master

# build the docker compose
sudo docker-compose build

# run the docker compose
sudo docker-compose up
