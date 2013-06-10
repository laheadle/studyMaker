
define(['backbone'], function (Backbone) {
    var Message = new (Backbone.Model.extend({
        setDefault: function() {
            this.set('msg', 'Hover over a question to see the answer.')
        }
    }))
    return Message
})