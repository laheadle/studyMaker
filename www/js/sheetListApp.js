

define(['underscore', 'backbone', 'jquery', 'sheetList', 'sheetView'], 
       function (_, Backbone, $, SheetList, SheetView) {

           var App = new (Backbone.View.extend({

               el: $("#content"),

               initialize: function() {
                   this.listenTo(SheetList, 'reset', this.addAll);
               },

               addOne: function(card) {
                   var view = new SheetView({model: card});
                   this.$el.append(view.render().el);
               },

               addAll: function() {
                   SheetList.each(this.addOne, this);
               }
           }))()

           return App;
       })