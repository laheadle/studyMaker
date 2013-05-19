

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {

    var Card = Backbone.Model.extend({

        swap: function() { 
            var q = this.get('question')
            this.set('question', this.get('answer'))
            this.set('answer', q)
        }
    })

    return Card
})