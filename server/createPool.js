define
(['mysql'],

 function (mysql) {
     return function(db, callb){
         callb(false, mysql.createPool(db))
     }
 })

