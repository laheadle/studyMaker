var mysql = require("mysql")

var createSheet =
    "create table tsheet (cid integer auto_increment primary key, cname varchar(256) not null)"

var createCard = 
    "create table tcard (cid integer auto_increment primary key,  cquestion text not null, canswer text not null, "+
    "cdifficulty integer not null, cshow varchar(1) not null, ccolor varchar(32) not null, csheet integer not null references tsheet)"


var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database: 'study'
});

pool.getConnection(function(err, connection) {
    connection.query(createSheet, function(err, rows) {

        if (err) {
            console.log('sheet failed', err)
        }
        connection.query(createCard, function(err, rows) {
            if (err) {
                console.log('card failed', err)
            }
            connection.end();
            process.exit(0);
        });
    });
})

