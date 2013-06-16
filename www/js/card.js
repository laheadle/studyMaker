

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {

    var Card = Backbone.Model.extend({

        urlRoot: '/card',
        idAttribute: 'cid',

        swap: function() { 
            this.set('cshow', this.get('cshow') === 'q' ? 'a' : 'q')
        }
    })

    return Card
})