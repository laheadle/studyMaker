
define(['underscore', 'backbone', 'jquery', 'text!tmpl/sheetLink.ejs'], 

       function (_, Backbone, $, template) {

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