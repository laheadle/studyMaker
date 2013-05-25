

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {

    var Card = Backbone.Model.extend({

        urlRoot: '/card',
        idAttribute: 'cid',

        swap: function() { 
            var q = this.get('cquestion')
            this.set('cquestion', this.get('canswer'))
            this.set('canswer', q)
        }
    })

    return Card
})