requirejs.config({
    paths: {
        tmpl: '../tmpl',
        jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
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
        }
    }
});

require(['underscore', 'backbone', 'jquery', 
         'sheetList', 'sheetListApp'], 
        function (_, Backbone, $, SheetList) {

            SheetList.reset(JSON.parse($('#payload').text()))

            $('body').animate({'opacity': 1}, 300)

        })
