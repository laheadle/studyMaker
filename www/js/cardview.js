
define(['underscore', 'backbone', 'jquery', 'message', 'text!tmpl/card.ejs', 'state'], 

       function (_, Backbone, $, Message, cardTemplate, State) {

    var CardView = Backbone.View.extend({
        template: _.template(cardTemplate),
        className: "pair",
        events: {
            "mouseenter"   : "reveal",

            "click .increment" : function() {
                this.setDifficulty(function(d){ return d + 1 })
                return false
            },

            "click .decrement" : function() {
                this.setDifficulty(function(d){ return d - 1 })
                return false
            },

            "click .question" : "google"
        },

        setDifficulty: function(fun) {
            this.model.set('difficulty', fun(this.model.get('difficulty')))
            this.model.save()
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render)
            this.listenTo(this.model, 'change:difficulty', this.hide)
            this.listenTo(State, 'change', this.render)
        },

        render: function() {
            var $elt = this.$el
            $elt.html(this.template(this.model.toJSON()));

            if (State.get('difficulty') === this.model.get('difficulty')) {
                $elt.removeClass('hidden')
            }
            else {
                $elt.addClass('hidden')
            }
            return this;
        },

        hide: function() {
            var $elt = this.$el
            $elt.addClass('hidden')
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