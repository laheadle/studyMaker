require(
    ['jquery', 'cards', 'messageView', 'cardsApp', 'text!tmpl/cardsApp.html'], 
    function ($, Cards, MessageView, CardsApp, tmpl) {

        var messageView = new MessageView({
            el: $('#message')
        })
        
        var cardsApp = new CardsApp({
            el: $(tmpl)
        })
        cardsApp.$el.appendTo($('body'))
        // Initialize the collection of cards from inline json data.
        Cards.reset(JSON.parse($('#questions').text()))
    })
