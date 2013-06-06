var child = require('child_process'),
fs = require('fs')

var db = JSON.parse(fs.readFileSync('../config.json')).db

var drop = 'mysqladmin --user='+db.user+' --password='+db.password+' drop '+ db.database
var create = 'mysqladmin --user='+db.user+' --password='+db.password+' create '+ db.database

child.exec(drop)
child.exec(create)

