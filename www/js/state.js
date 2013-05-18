

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
    var model = Backbone.Model.extend({
        initialize: function() { this.set('difficulty', 5) }
    });

    return new model;
})