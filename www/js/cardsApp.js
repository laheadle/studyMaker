

define([
    'underscore',
    'backbone',
    'jquery',
    'cards',
    'cardview',
    'difficultyView',
    'message'],
       function (_, Backbone, $, Cards, CardView, DifficultyView, Message) {

    return Backbone.View.extend({

        events: {
            // Swap questions and answers if the content area is clicked.
            "click": function() { Cards.swapAll() },

            // Show a usage instruction if they're not hovering on
            // anything in particular.
            "mouseover": function() {
                this.$el.find('.question.selected').removeClass('selected')
                Message.setDefault()
            },
        },

        initialize: function() {
            this.listenTo(Cards, 'reset', this.addAll);
            var difficulty = new DifficultyView;
            this.$el.find('.header').append(difficulty.render().el);
        },

        addOne: function(card) {
            var view = new CardView({model: card});
            this.$el.find('.list').append(view.render().el);
        },

        addAll: function() {
            Cards.each(this.addOne, this);
            // Fade in nicely.
            this.$el.animate({'opacity': 1}, 300)
        }
    })

})