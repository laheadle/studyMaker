

define(['underscore', 'backbone', 'jquery', 'message'], function (_, Backbone, $, Message) {

    var MessageView = new (Backbone.View.extend({
        el: $('#message'),
        template: _.template('<%= msg %>'),
        initialize: function() {
            this.listenTo(this.model, 'change', this.render)
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    }))({model: Message}) 

    return MessageView
})