define
(['jquery', 
  'text!tmpl/cardsApp.html',
  'tests/setupTest'], 
 function ($, tmpl, setupTest) {


     return describe('Cards App', function() {

         beforeEach(function() { setupTest(this, $(tmpl)) });

         it('should hide card and set its difficulty when its increment button is clicked', function() {
             var card = this.cards.at(0)
             expect(card.view.$el.hasClass('hidden')).toBe(false)
             expect(card.get('cdifficulty')).toEqual(5)
             card.view.$el.find('.increment').trigger('click')
             expect(card.view.$el.hasClass('hidden')).toBe(true)
             expect(card.get('cdifficulty')).toEqual(6)
         });

         it('should hide card and not set its difficulty when global increment button is clicked', function() {
             var card = this.cards.at(0)
             this.cardsApp.$el.find('.difficulty .increment').trigger('click')
             expect(card.view.$el.hasClass('hidden')).toBe(true)
             expect(card.get('cdifficulty')).toEqual(5)
             this.cardsApp.$el.find('.difficulty .decrement').trigger('click')
             expect(card.view.$el.hasClass('hidden')).toBe(false)
         });

         it('should swap question and answer when asked', function() {
             var card = this.cards.at(0)
             expect(card.view.$el.find('.textContent').text()).toEqual('question1')
             card.swap()
             expect(card.view.$el.find('.textContent').text()).toEqual('answer1')
         });

         it('should set global difficulty with a key press', function() {
             var card = this.cards.at(0)
             $('body').trigger({type: 'keyup', keyCode:39})
             expect(card.view.$el.hasClass('hidden')).toBe(true)
             expect(card.get('cdifficulty')).toEqual(5)
             $('body').trigger({type: 'keyup', keyCode:37})
             expect(card.view.$el.hasClass('hidden')).toBe(false)
         });

         it('should display messages', function() {
             this.state.set('msg', 'message1')
             expect(this.messageView.$el.text()).toBe('message1')
         });


     })
 }
)

