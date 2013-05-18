
define(['underscore', 'backbone', 'jquery', 'message'], function (_, Backbone, $, Message) {

    var CardView = Backbone.View.extend({
        template: _.template($('#card-template').html()),
        className: "pair",
        events: {
            "mouseenter"   : "show",
            "click .delete" : "del",
            "click .question" : "google"
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render)
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        show: function() {
            Message.set('msg', this.model.get('answer'))
            $('.question.selected').removeClass('selected')
            this.$('.question').addClass('selected')
        },

        del: function() {
            var that = this
            this.$el.animate({opacity: 0}, 400, 'linear', function(){ that.remove(); });
            return false
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