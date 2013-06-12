

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
    var model = Backbone.Model.extend({
        initialize: function() { 
            this.set('cdifficulty', 5)
            this.setDefaultMessage()
        },
        setDefaultMessage: function() {
            this.set('msg', 'Hover over a question to see the answer.')
        }
    });

    return new model();
})