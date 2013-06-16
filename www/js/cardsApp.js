

define([
    'underscore',
    'backbone',
    'jquery',
    'cards',
    'cardview',
    'difficultyView',
    'state'],
       function (_, Backbone, $, Cards, CardView, DifficultyView, State) {

    return Backbone.View.extend({

        events: {
            // Swap questions and answers if the content area is clicked.
            "click": function() { Cards.swapAll() },

            // Show a usage instruction if they're not hovering on
            // anything in particular.
            "mouseover": function() {
                this.$el.find('.visibleFace.selected').removeClass('selected')
                State.setDefaultMessage()
            },
        },

        initialize: function() {
            this.listenTo(Cards, 'reset', this.addAll);
            var difficulty = new DifficultyView;
            this.$el.find('.header').append(difficulty.render().el);
        },

        addOne: function(card) {
            var view = new CardView({model: card});
            // Store a reference for convenience
            view.model.view = view
            this.$el.find('.list').append(view.render().el);
        },

        addAll: function() {
            Cards.each(this.addOne, this);
            // Fade in nicely.
            this.$el.animate({'opacity': 1}, 300)
        }
    })

})