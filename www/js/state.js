

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
    var model = Backbone.Model.extend({
        initialize: function() { this.set('cdifficulty', 5) }
    });

    return new model;
})