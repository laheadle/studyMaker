module.exports = function(grunt) {
    // requirejs boilerplate
    var requirejs = require('requirejs');

    requirejs.config({
        baseUrl: './server',
        nodeRequire: require
    });
    // end requirejs boilerplate

    grunt.initConfig({
        test: {
            config: grunt.file.readJSON('./config-test.json')
        },
        dev: {
            config: grunt.file.readJSON('./config-dev.json')
        }
    });

    grunt.task.registerTask('dev', 'start the dev server', function() {
        var done = this.async();
        requirejs
        ([
            'step',
            'createPool',
            'start'
        ],
         function (step,
                   createPool,
                   startServer) {
             var conf = grunt.config('dev.config')
             ,dbConf = conf.db
             ,serverConf = conf.server
             step(
                 function() {
                     createPool(dbConf, this)
                 },
                 function(err, pool) {
                     if (err) {console.log(err); throw err}
                     startServer(pool, serverConf, this)
                 }
             )
         })
    })

    grunt.task.registerTask('test', 'Run the test suite', function() {
        var done = this.async();
        requirejs
        ([
            'createDB',
            'createTables',
            'test/createData',
            'test/runTests',
            'step',
            'start'
        ],
         function (createDB, 
                   createTables,
                   createData,
                   runTests,
                   step,
                   startServer) {
             var conf = grunt.config('test.config')
             ,dbConf = conf.db
             ,serverConf = conf.server
             ,pool = null
             step(
                 function() {
                     createDB(dbConf, this)
                 },
                 function(err) {
                     if (err) throw err
                     createTables(dbConf, this)
                 },
                 function(err, pool_) {
                     if (err) throw err
                     pool = pool_
                     createData(pool, this)
                 },
                 function(err) {
                     if (err) throw err
                     startServer(pool, serverConf, this)
                 },
                 function(err) {
                     if (err) throw err
                     runTests(serverConf, this)
                 },
                 function(err) {
                     if (err) { console.log(err); throw err }
                     done()
                 }
             )
         })
    })
}
