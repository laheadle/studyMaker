define( [
    'messageView',
    'cardsApp',
    'cards',
    'state'
], function(MessageView, CardsApp, Cards, State) {
    return function (spec, el) {
        spec.messageView = new MessageView({
        })
        
        spec.cardsApp = new CardsApp({
            el: el
        })

        spec.cards = Cards
        spec.state = State
        // Initialize the collection of cards from inline json data.
        Cards.reset(JSON.parse($('#questions').text()))
        State.initialize()
    }
})