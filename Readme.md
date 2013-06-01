
#Install

install mysql and maybe delete script/my.ini

there are some node modules required, so do npm install when something breaks

## create database and tables
cd script

sh create-db.sh

node create-tables

## create a deck
cd ..

node sm reformation

## start webserver
node app

## visit
http://localhost:3000/sheets/all