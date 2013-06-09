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
        },
        createDev: {
            config: grunt.file.readJSON('./config-dev.json')
        },
        importDeck: {
            config: grunt.file.readJSON('./config-dev.json')
        }
    });

    grunt.task.registerTask('createDev', 'Create the dev database', function() {
        var done = this.async();
        requirejs
        ([
            'createDB',
            'createTables',
            'step'
        ],
         function (createDB, 
                   createTables,
                   step) {
             var conf = grunt.config('createDev.config')
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
                 function(err) {
                     if (err) { console.log(err); throw err }
                     done()
                 }
             )
         })
    })

    grunt.task.registerTask('importDeck', 'import a deck into a database', function() {
        var done = this.async();
        requirejs
        ([
            'createPool',
            'import',
            'step'
        ],
         function (createPool,
                   importDeck,
                   step) {
             var conf = grunt.config('importDeck.config')
             ,dbConf = conf.db
             ,serverConf = conf.server
             ,pool = null
             step(
                 function() {
                     createPool(dbConf, this)
                 },
                 function(err, pool) {
                     if (err) throw err
                     importDeck(pool, grunt.option('from') || 'reformation', done)
                 }
             )
         })
    })

    grunt.task.registerTask('dev', 'start the dev server', function() {
        var done = this.async();
        requirejs
        ([
            'step',
            'createPool',
            'start',
            'open'
        ],
         function (step,
                   createPool,
                   startServer,
                   open) {
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
                 },
                 function(err) {
                     if (err) throw err
                     open('http://'+serverConf.host+':'+serverConf.port+'/sheets/all')
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
