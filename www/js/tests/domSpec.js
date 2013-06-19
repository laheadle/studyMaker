define
(['jquery',
  'text!tmpl/cardsApp.html',
  'tests/setupTest'], 
 function ($, tmpl, setupTest) {


     return describe('Tests that require elements installed in the Dom', function() {

         beforeEach(function() { 
             setupTest(this, $(tmpl).appendTo($('body'))) 
         });

         afterEach(function () {
             this.cardsApp.$el.remove()
         });

         it('check that one card is taller than another', function() {
             var shortCard = this.cards.findWhere({cquestion: 'short'})
             var tallCard = this.cards.findWhere({cquestion: 'tall'})
             expect(shortCard.view.$el.find('.visibleFace').height())
                 .toBeLessThan(tallCard.view.$el.find('.visibleFace').height())
         });

     })
 }
)

