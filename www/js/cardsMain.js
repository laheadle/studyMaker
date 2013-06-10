require(['underscore', 'backbone', 'jquery', 
         'cardview', 'message', 'cards', 'messageView', 'cardsApp'], 
        function (_, Backbone, $, CardView, Message, Cards, MessageView, CardsApp) {

            var messageView = new MessageView({
                el: $('#message'),
                model: Message
            })
            
            var cardsApp = new CardsApp({
                el: $(".content")
            })

            // Initialize the collection of cards from inline json data.
            Cards.reset(JSON.parse($('#questions').text()))
        })
