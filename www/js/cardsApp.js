

define(['underscore', 'backbone', 'jquery', 'cards', 'cardview', 'state', 'difficultyView'], 
       function (_, Backbone, $, Cards, CardView, State, DifficultyView) {

    return Backbone.View.extend({

        initialize: function() {
            this.listenTo(Cards, 'reset', this.addAll);
            var difficulty = new DifficultyView;
            this.$el.append(difficulty.render().el);
        },

        addOne: function(card) {
            var view = new CardView({model: card});
            this.$el.append(view.render().el);
        },

        addAll: function() {
            Cards.each(this.addOne, this);
        }
    })

})