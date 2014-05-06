define
(['mysql', 'q'],

 // using promises:

 function (mysql, Q) {
     return function(db){
         var database = db.database;
         delete db.database // don't try to connect to a database, it may not exist
         var pool  = mysql.createPool(db);
         var getConnection = Q.nbind(pool.getConnection, pool)

         function dropAndCreate(conn) {
	     console.log('createDB', typeof conn)
	     return Q.ninvoke(conn, 'query', 'drop database if exists ??', [database])
		 .then(function () {
		     return Q.ninvoke(conn, 'query', 'create database ??', [database])
		 }).then(Q.fcall(function() {
		     return db.database = database
		 }))
	 }

	 return getConnection().then(dropAndCreate)
     }
 }
);
