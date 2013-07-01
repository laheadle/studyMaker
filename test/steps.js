// requirejs boilerplate
var requirejs = require('requirejs');

requirejs.config({
    baseUrl: './server',
    nodeRequire: require
});
// end requirejs boilerplate

describe('Server tests', function(){
    describe('stepcon', function(){
        it('should run fourth arg as a step function', function(done){
            requirejs
            (['createpool', 'stepCon', 'assert', 'step', 'fs'],
             function (createpool, stepCon, assert, step, fs) 
             {
                 // add a fourth argument to stepcon and make sure it is run
                 var wasRun = false;
                 step(
                     function(db) {
                         fs.readFile('./config-test.json', 'utf8', this)
                     },
                     function(err, conf) {
                         if (err) { throw err }
                         createpool(JSON.parse(conf).db, this)
                     },
                     function(err, pool) {
                         if (err) { throw err }
                         var that = this
                         stepCon(pool,
                                 function query(connection) {
                                     connection.query('select * from tsheet', this)
                                 },
                                 function done(rows) {
                                     // only called once
                                     assert(!this.already)
                                     this.already = true
                                     this(null)
                                 },
                                 function(err) {
                                     if (err) { throw err }
                                     // actually called
                                     wasRun = true;
                                     that(null)
                                 }
                                )
                     },
                     function(err) {
                         if (err) { throw err }
                         assert(wasRun)
                         done()
                     }
                 )
             }
            )
        })

    })
})


