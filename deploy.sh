#! /usr/bin/bash
git pull && sudo docker-compose down && sudo docker image rm htetlinmaung/sayinweb && sudo docker-compose up -d