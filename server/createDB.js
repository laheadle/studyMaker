define
(['stepCon', 
  'mysql'],

 function (stepCon, mysql) {
     return function(db, callb){
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
             function() { 
                 db.database = database
                 callb() 
             }
         )
     }
 }
);