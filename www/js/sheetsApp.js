

define(['underscore', 'backbone', 'jquery', 'sheets', 'sheetView'], 
       function (_, Backbone, $, Sheets, SheetView) {

           var App = new (Backbone.View.extend({

               el: $("#content"),

               initialize: function() {
                   this.listenTo(Sheets, 'reset', this.addAll);
               },

               addOne: function(card) {
                   var view = new SheetView({model: card});
                   this.$el.append(view.render().el);
               },

               addAll: function() {
                   Sheets.each(this.addOne, this);
               }
           }))()

           return App;
       })