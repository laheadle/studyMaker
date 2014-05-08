// requirejs boilerplate
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: './server',
    nodeRequire: require
});
// end requirejs boilerplate

var Q = require("q")

function testInsertCards(done){
    requirejs
    (['assert', 'sinon', 'insertCards'],
     function (assert,sinon,insertCards) {
	 var conn = { 
	     query: sinon.spy(function (str, card, callb) {
		 callb(null)
	     })
	 }
	 var c1 = {}
	 var c2 = {}
	 var cards = [ c1, c2 ]
	 var sheetId = 1
	 Q.nfcall(insertCards, conn, cards, sheetId).then(function () {
	     assert(conn.query.callCount === 2)
	     assert(cards.length === 0)
	     assert(c1.csheet === c2.csheet && c1.csheet === sheetId)
	     done()
	 }).done()
     }
     
    )
}

describe('Import tests', function(){
    describe('testCards', function(){
        it('should tell connection to insert all cards', testInsertCards)
    })
})


