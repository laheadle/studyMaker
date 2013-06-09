define
(['stepCon', 
  'mysql'],

 function (stepCon, mysql) {
     var createSheet =
         "create table tsheet (cid integer auto_increment primary key, cname varchar(256) not null)"

     var createCard = 
         "create table tcard (cid integer auto_increment primary key,  cquestion text not null, canswer text not null, "+
         "cdifficulty integer not null, cshow varchar(1) not null, ccolor varchar(32) not null, csheet integer not null references tsheet)"

     return function(db, callb){
         var pool  = mysql.createPool(db);
         var conn = null
         stepCon(
             pool,
             function sheet(connection) {
                 conn = connection
                 conn.query(createSheet, this)
             },
             function card() {
                 conn.query(createCard, function(){
                     callb(false, pool)
                 })
             }
         )
     }
 })

