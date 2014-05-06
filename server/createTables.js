define
(['mysql', 'q'],

 function (mysql, Q) {
     var createSheet =
         "create table tsheet (cid integer auto_increment primary key, cname varchar(256) not null)"

     var createCard = 
         "create table tcard (cid integer auto_increment primary key,  cquestion text not null, canswer text not null, "+
         "cdifficulty integer not null, cshow varchar(1) not null, ccolor varchar(32) not null, csheet integer not null references tsheet)"

     return function(db){
         var pool  = mysql.createPool(db);
         var getConnection = Q.nbind(pool.getConnection, pool)

         function tables(conn) {
	     return Q.ninvoke(conn, 'query', createSheet)
		 .then(
		     function () {
			 return Q.ninvoke(conn, 'query', createCard)
		     }
		 )
	 }

	 return getConnection().then(tables)
     }
 })

