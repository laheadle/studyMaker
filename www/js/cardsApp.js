

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
        },

        initialize: function() {
            this.listenTo(Cards, 'reset', this.addAll);
            var difficulty = new DifficultyView;
            this.$el.find('.header').append(difficulty.render().el);
        },

        addOne: function(card) {
            return new CardView(
                {model: card}, 
                // We pass ourselves in so the CardView can figure out
                // its own best height by (briefly) attaching an
                // element to our element.
                {$parent: this}
            ).render();
        },

        attach: function(cardView) {
            this.$el.find('.list').append(cardView.$el)
        },

        addAll: function() {
            Cards.each(this.addOne, this);
            // Fade in nicely.
            this.$el.animate({'opacity': 1}, 300)
        }
    })

})