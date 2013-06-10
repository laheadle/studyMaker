

define(['underscore', 'backbone', 'message'], function (_, Backbone, Message) {

    return Backbone.View.extend({
        template: _.template('<%= msg %>'),
        initialize: function() {
            this.model = Message
            this.listenTo(this.model, 'change', this.render)
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })

})