module.exports = function(grunt) {
    // requirejs boilerplate
    var requirejs = require('requirejs');

    requirejs.config({
        baseUrl: './server',
        nodeRequire: require
    });
    // end requirejs boilerplate

    grunt.initConfig({
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
}
