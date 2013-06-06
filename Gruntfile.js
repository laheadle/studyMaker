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
            dbConfig: grunt.file.readJSON('./config.json')
        }
    });

    grunt.task.registerTask('test', 'Run the test suite', function() {
        var done = this.async();
        requirejs
        ([
            'createDB'
        ],
         function (createDB) {
             createDB(grunt.config('test.dbConfig'))
             done()
         })
    })
}
