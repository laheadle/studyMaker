

define(['underscore', 'backbone', 'jquery', 'card'], function (_, Backbone, $, Card) {

    var Sheet = new (Backbone.Collection.extend({
        model: Card,

        swapAll: function () {
            this.each(function(card) {
                card.swap()
            })
        }

    }))

    return Sheet
})