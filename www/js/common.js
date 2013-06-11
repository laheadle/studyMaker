require.config({
    baseUrl: '/js',
    paths: {
        tmpl: '../tmpl',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        // Thanks: http://kilon.org/blog/2012/08/testing-backbone-requirejs-applications-with-jasmine/
        'lib/jasmine': {
            exports: 'jasmine'
        },
        'lib/jasmine-html': {
            deps: ['lib/jasmine'],
            exports: 'jasmine'
        }
    }
});