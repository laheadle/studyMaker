var Step = require("step")
, async = require("async")
, mysql = require("mysql")
, fs = require("fs")

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database: 'study'
});

var cards = []

var name = process.argv[2]

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

var connection;

Step(
    function openFile() {
        fs.readFile('./sheets/'+name +'.txt', 'utf8', this)
    },
    function readFile(err, txt) {
             if (err) {
                console.log(err)
                throw new Error
            }
        return cards = pairs(txt.split('\r\n'))
    },
    function openConn() {
        pool.getConnection(this);
    },
    function withConn(err, c) {
            if (err) {
                console.log(err)
                throw new Error
            }
        connection = c
        connection.query('insert into tsheet (cname) values(?)', name, this);
    },
    function insertAll(err, result) {
            if (err) {
                console.log(err)
                throw new Error
            }
        var that = this;
        async.whilst(
            function() { return cards.length > 0 },
            function(callb) {
                var card = cards.shift()
                card = { 
                    cquestion: card[0], 
                    canswer: card[1],
                    cdifficulty: 5,
                    cshow: 'q', 
                    ccolor: 'color'+getRandomInt(0, 5),
                    csheet: result.insertId
                }
                connection.query('insert into tcard SET ?', card, function(err, result) {
                    callb(err)
                })
            },
            function (err) { 
                if (err) {
                    console.log(err)
                    throw new Error
                }
                process.exit(0)
            }
        )
    },
    function () {
        process.exit(0)
    }
)
