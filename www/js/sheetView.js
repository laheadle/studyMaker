
define(['underscore', 'backbone', 'jquery', 'message', 'text!tmpl/sheetLink.ejs'], 

       function (_, Backbone, $, Message, template) {

    var View = Backbone.View.extend({
        template: _.template(template),
        className: "sheetLink",

        render: function() {
            var $elt = this.$el
            $elt.html(this.template(this.model.toJSON()));
            return this;
        },
    }) 

    return View
})