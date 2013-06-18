
define(['underscore', 'backbone', 'jquery', 'text!tmpl/card.ejs', 'state'], 

       function (_, Backbone, $, cardTemplate, State) {

    var CardView = Backbone.View.extend({
        template: _.template(cardTemplate),
        className: "pair",
        events: {
            "mouseenter"   : function() { 
                this.model.swap() 
                this.focus()
            },

            "mouseleave"   : function() { 
                this.model.swap() 
                this.blur()
            },

            "click .increment" : function() {
                this.setDifficulty(function(d){ return d + 1 })
                return false
            },

            "click .decrement" : function() {
                this.setDifficulty(function(d){ return d - 1 })
                return false
            },

            "click .visibleFace" : "google"
        },

        setDifficulty: function(fun) {
            this.model.set('cdifficulty', fun(this.model.get('cdifficulty')))
            this.model.save()
        },

        initialize: function(attrs, options) {
            this.listenTo(this.model, 'change:cshow', this.swap)
            this.listenTo(this.model, 'change:cdifficulty', this.hide)
            this.listenTo(State, 'change:cdifficulty', this.render)
            // Store a reference for convenience
            this.model.view = this
            options.$parent.attach(this)
            // Calculate the height right away, and then stash the
            // result. When we render, we can refer to this variable
            // and set the height of the rendered Element.
            this.height = this.calculateHeight()
        },

        calculateHeight: function() {
            var q = this.model.get('cquestion'),
            a = this.model.get('canswer')
            var model = _.clone(this.model.toJSON())//think
            model.cshow = q.length > a.length? 'q' : 'a'
            var $el = this.$el.clone()
            var height = $el.css('visibility', 'hidden')
                .html(this.template(model))
                .appendTo(this.$el.parent())
                .find('.visibleFace')
                .height()
            $el.remove()
            return height
        },

        render: function() {
            var $elt = this.$el
            $elt.html(this.template(this.model.toJSON()));
            // Set the height (pre-calculated).
            $elt.find('.visibleFace').css('height', this.height+'px')
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

        swap: function() {
            var m = this.model
            this.$('.visibleFace .textContent').text(
                m.get('cshow') === 'q' ? 
                    m.get('cquestion') : 
                    m.get('canswer')
            )
            return false
        },

        focus: function() {
            this.$('.visibleFace').addClass('selected')
        },

        blur: function() {
            this.$('.visibleFace').removeClass('selected')
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