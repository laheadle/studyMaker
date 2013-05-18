

define(['underscore', 'backbone', 'jquery', 'sheet', 'cardview'], function (_, Backbone, $, Sheet, CardView) {

    var App = new (Backbone.View.extend({

        el: $("#content"),

        initialize: function() {
            this.listenTo(Sheet, 'reset', this.addAll);
        },

        addOne: function(card) {
            var view = new CardView({model: card});
            this.$el.append(view.render().$el);
        },

        addAll: function() {
            Sheet.each(this.addOne, this);
        }
    }))

})