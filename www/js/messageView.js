

define(['underscore', 'backbone', 'state'], function (_, Backbone, State) {

    return Backbone.View.extend({
        template: _.template('<%= msg %>'),
        className: "message",
        initialize: function() {
            this.listenTo(State, 'change', this.render)
        },
        render: function() {
            this.$el.html(this.template(State.toJSON()));
            return this;
        }
    })

})