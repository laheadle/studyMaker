
define(['underscore', 'backbone', 'jquery', 'message', 'text!tmpl/difficulty.ejs', 'state'], function (_, Backbone, $, Message, template, State) {

    return Backbone.View.extend({
        template: _.template(template),
        id: "difficulty",
        events: {
            "click .increment" : function() {
                State.set('difficulty', State.get('difficulty') + 1)
                return false
            },

            "click .decrement" : function() {
                State.set('difficulty', State.get('difficulty') - 1)
                return false
            }
        },

        initialize: function() {
            this.listenTo(State, 'change', this.render)
        },

        render: function() {
            this.$el.html(this.template(State.toJSON()));
            return this
        },

    }) 
})