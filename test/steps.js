// requirejs boilerplate
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: './server',
    nodeRequire: require
});
// end requirejs boilerplate

function testFourthArg(done){
    requirejs
    (['stepCon', 'assert', 'step', 'sinon'],
     function (stepCon, assert, step, sinon) 
     {
         step(
             function() {
                 var that = this

                 this.pool = { 
                     getConnection: function(callb) { 
                         var conn = { 
                             end: sinon.stub()
                         }
                         callb(null, conn)
                     }
                 }
                 
                 this.query = sinon.spy(function () {
                     this(null)
                 })

                 this.done = sinon.spy(function () {
                     this(null)
                 })

                 this.last = sinon.spy(function(err) {
                     if (err) { throw err }
                     that(null)
                 })

                 stepCon(this.pool, this.query, this.done, this.last)
             },
             function(err) {
                 if (err) { throw err }
                 assert(this.query.calledOnce)
                 assert(this.done.calledOnce)
                 assert(this.last.calledOnce)
                 done()
             }
         )
     }
    )
}

describe('Server tests', function(){
    describe('stepcon', function(){
        it('should run fourth arg as a step function', testFourthArg)
    })
})


