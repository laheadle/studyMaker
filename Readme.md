
#Install

## install node subpackages
npm install

##install mysql 
[do whatever for your platform]
maybe delete script/my.ini

## create dev database and tables

cp example-config.json config-dev.json

[edit config-dev.json]

grunt createDev

## import a deck from a text file

grunt importDeck

## start webserver
grunt dev

## visit
http://[yourdomain]:[yourport]/sheets/all