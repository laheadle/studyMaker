define
(['fs', 
  'stepCon', 
  'mysql'],

 function (fs,   stepCon, mysql) {
     return function(db){
         var database = db.database
         delete db.database

         var pool  = mysql.createPool(db);
         var conn = null
         stepCon(
             pool,
             function drop(connection) {
                 conn = connection
                 conn.query('drop database if exists ??', [database], this)
             },
             function create() {
                 conn.query('create database ??', [database], this)
             },
             function() { process.exit(0) }
         )
     }
 }
);