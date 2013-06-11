define
(['jquery', 'cards', 'messageView', 'cardsApp', 'text!tmpl/cardsApp.html'], 
 function ($, Cards, MessageView, CardsApp, tmpl) {


     return describe('Cards App', function() {

         beforeEach(function () {
             this.messageView = new MessageView({
             })
             
             this.cardsApp = new CardsApp({
                 el: $(tmpl)
             })

             // Initialize the collection of cards from inline json data.
             Cards.reset(JSON.parse($('#questions').text()))

         });


         it('should hide card and set its difficulty when its increment button is clicked', function() {
             var card = Cards.at(0)
             expect(card.view.$el.hasClass('hidden')).toBe(false)
             expect(card.get('cdifficulty')).toEqual(5)
             card.view.$el.find('.increment').trigger('click')
             expect(card.view.$el.hasClass('hidden')).toBe(true)
             expect(card.get('cdifficulty')).toEqual(6)
         });

         it('should hide card and not set its difficulty when global increment button is clicked', function() {
             var card = Cards.at(0)
             this.cardsApp.$el.find('.difficulty .increment').trigger('click')
             expect(card.view.$el.hasClass('hidden')).toBe(true)
             expect(card.get('cdifficulty')).toEqual(5)
             this.cardsApp.$el.find('.difficulty .decrement').trigger('click')
             expect(card.view.$el.hasClass('hidden')).toBe(false)
         });

         it('should set global difficulty with a key press', function() {
             var card = Cards.at(0)
             this.cardsApp.$el.find('.difficulty').trigger({type: 'keyup', keyCode:39})
             expect(card.view.$el.hasClass('hidden')).toBe(true)
             expect(card.get('cdifficulty')).toEqual(5)
             this.cardsApp.$el.find('.difficulty').trigger({type: 'keyup', keyCode:37})
             expect(card.view.$el.hasClass('hidden')).toBe(false)
         });



     })
 }
)

