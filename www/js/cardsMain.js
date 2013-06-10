require(
    ['cards', 'messageView', 'cardsApp'], 
    function (Cards, MessageView, CardsApp) {

        var messageView = new MessageView({
            el: $('#message')
        })
        
        var cardsApp = new CardsApp({
            el: $(".content")
        })

        // Initialize the collection of cards from inline json data.
        Cards.reset(JSON.parse($('#questions').text()))
    })
