
define(['underscore', 'backbone', 'jquery', 'message', 'text!tmpl/difficulty.ejs', 'state'], function (_, Backbone, $, Message, template, State) {

    return Backbone.View.extend({
        template: _.template(template),
        tagName: "span",
        className: "difficulty",
        events: {
            "click .increment" : "increment",
            "click .decrement" : "decrement",
            'keyup': 'doKey',
        },

        initialize: function() {
            this.listenTo(State, 'change', this.render)
            var that = this;
            $('body').keyup(function(e){ that.doKey(e) });
        },

        increment: function() {
            State.set('cdifficulty', State.get('cdifficulty') + 1)
            return false
        },

        decrement: function() {
            State.set('cdifficulty', State.get('cdifficulty') - 1)
            return false
        },

        render: function() {
            this.$el.html(this.template(State.toJSON()));
            return this
        },

        doKey: function(e) {
            switch (e.keyCode) {
            case 37://left
                this.decrement()
                break;
            case 39://right
                this.increment()
                break;
            }
            return false;
        }

    }) 
})