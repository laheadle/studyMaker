module.exports = function(grunt) {
    var Q = require('q')
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
        },

        jshint: {
            options: {
                asi: true,
                laxcomma: true,
                laxbreak: true
            },

            all: ['Gruntfile.js', 'www/**/*.js', 'server/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    function asyncTask(done, promise) {
	promise.then(done).fail(
	    function(e) { 
		done(e) 
	    }
	).done()
    }

    grunt.task.registerTask('createDev', 'Create the dev database', function() {
        var done = this.async();
        requirejs
        ([
	    'createDB',
            'createTables'
        ], function (createDB, createTables) {
            var conf = grunt.config('createDev.config')
            ,dbConf = conf.db
	    asyncTask(done,
		      createDB(dbConf).then(
			  function () {
			      return createTables(dbConf)
			  }
		      ))
        })
    })

    grunt.task.registerTask('importDeck', 'import a deck into a database', function() {
	var done = this.async()
        requirejs
        ([
            'createPool',
            'import'
        ],
         function (createPool,
                   importDeck) {
             var conf = grunt.config('importDeck.config')
             ,dbConf = conf.db
	     asyncTask(done, importDeck(dbConf, grunt.option('from') || 'reformation'))
           }
         )
    })

    grunt.task.registerTask('dev', 'start the dev server', function() {
        var done = this.async();
        requirejs
        ([
            'start',
            'open'
        ],
         function (startServer,
                   open) {
             var conf = grunt.config('dev.config')
	     startServer(conf).then(
		 function() {
		     console.log('opening')
		     open('http://'+conf.server.host+':'+conf.server.port+'/sheets/all')
		 }).done()
	 })
    })
		       

    // Set up test data and run the test suite. You can pass the
    // option --no-run if you don't want this to actually open a
    // browser window to run the tests. This enables a debugging
    // technique: Fist you set a breakpoint in your browser, then run
    // grunt test to initialize data, then reload your test page
    // yourself, which pauses in the debugger.
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
             if (conf.server.port === grunt.config('dev.config').server.port) 
                 grunt.fail.fatal("Test and dev configs should be different.")
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
                     if(!grunt.option('no-run')) {
                         runTests(serverConf, done)
                     }
                 }
             )
         })
    })
}
