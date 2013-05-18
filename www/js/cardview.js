
define(['underscore', 'backbone', 'jquery', 'message', 'text!tmpl/card.ejs'], function (_, Backbone, $, Message, cardTemplate) {

    var CardView = Backbone.View.extend({
        template: _.template(cardTemplate),
        className: "pair",
        events: {
            "mouseenter"   : "reveal",

            "click .delete" : function() {
                this.model.set('hide', true)
                return false
            },

            "click .question" : "google"
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render)
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            // If they've just hidden this card:
            if (this.model.changed.hide) {
                var $elt = this.$el
                $elt.animate({opacity: 0}, 400, 'linear', function(){ $elt.addClass('hidden'); });
            }
            return this;
        },

        reveal: function() {
            Message.set('msg', this.model.get('answer'))
            $('.question.selected').removeClass('selected')
            this.$('.question').addClass('selected')
        },

        google: function(event) {

            function mkGoogleUrl(str) {
                return 'http://www.google.com/search?q='+str.replace(/ /g, '+')
            }

            function ctrlKeyPressed(e) { return e.ctrlKey }

            var url = mkGoogleUrl(this.model.get(ctrlKeyPressed(event)? 'question' : 'answer'))
            var win=window.open(url, '_blank');
            win.blur();
            win.focus();

        }
    }) 

    return CardView
})