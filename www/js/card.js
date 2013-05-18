

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {

    var Card = Backbone.Model.extend({

        defaults: {
            difficulty: 5
        },

        swap: function() { 
            var q = this.get('question')
            this.set('question', this.get('answer'))
            this.set('answer', q)
        }
    })

    return Card
})