define(
    function 
    (require) {

        /**
         * Module dependencies.
         */

        var Q = require("q")
        , async = require("async")
        , mysql = require("mysql")
        , fs = require("fs")
        , _ = require("underscore")
        , _insertCards = require("insertCards")


        return function(db, from) {
            if(!from) throw new Error("import what?")

            var cards = []
	    var pool  = mysql.createPool(db);
            var getConnection = Q.nbind(pool.getConnection, pool)

            function pairs(lst) {
                var cur = null
                var retval = []
                for (var i = 0;i < lst.length;i++) {
                    var l = lst[i]
                    if (cur === null)
                        cur = l
                    else {
                        retval.push([cur, l])
                        cur = null
                    }
                }
                return retval
            }

	    
            function getRandomInt (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

	    return getConnection().then(
		function (connection) {
		    function readFile() {
			return Q.nfcall(fs.readFile, './sheets/'+from +'.txt', 'utf8')
		    }

		    return readFile()
			.then(function insertSheet(txt) {
			    cards = pairs(txt.split(/\r?\n/))
			    return Q.ninvoke(connection, 'query', 'insert into tsheet (cname) values(?)', from)
			}).spread(function insertCards(result, _fields) {

			    var cardObjs = _.map(cards, function(card) { 
				return { 
				    cquestion: card[0], 
				    canswer: card[1],
				    cdifficulty: 5,
				    cshow: 'q', 
				    ccolor: 'color'+getRandomInt(0, 5),
				}
			    })

			    return Q.nfcall(_insertCards, connection, cardObjs, result.insertId)
			})
		})
	}
    }
)
