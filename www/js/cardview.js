
define(['underscore', 'backbone', 'jquery', 'text!tmpl/card.ejs', 'state'], 

       function (_, Backbone, $, cardTemplate, State) {

    var CardView = Backbone.View.extend({
        template: _.template(cardTemplate),
        className: "pair",
        events: {
            "mouseover"   : "reveal",

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
            this.model.set('cdifficulty', fun(this.model.get('cdifficulty')))
            this.model.save()
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render)
            this.listenTo(this.model, 'change:cdifficulty', this.hide)
            this.listenTo(State, 'change', this.render)
        },

        render: function() {
            var $elt = this.$el
            $elt.html(this.template(this.model.toJSON()));

            if (State.get('cdifficulty') === this.model.get('cdifficulty')) {
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
            State.set('msg', this.model.get('canswer'))
            $('.question.selected').removeClass('selected')
            this.$('.question').addClass('selected')
            return false
        },

        google: function(event) {

            function mkGoogleUrl(str) {
                return 'http://www.google.com/search?q='+str.replace(/ /g, '+')
            }

            function ctrlKeyPressed(e) { return e.ctrlKey }

            var url = mkGoogleUrl(this.model.get(ctrlKeyPressed(event)? 'cquestion' : 'canswer'))
            var win=window.open(url, '_blank');
            win.blur();
            win.focus();
            return false
        }
    }) 

    return CardView
})