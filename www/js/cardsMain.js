require(['underscore', 'backbone', 'jquery', 
         'cardview', 'message', 'cards', 'messageView', 'cardsApp'], 
        function (_, Backbone, $, CardView, Message, Cards) {

            // Initialize the collection of cards from inline json data.
            Cards.reset(JSON.parse($('#questions').text()))

            // Fade in nicely.
            $('body').animate({'opacity': 1}, 300)

            // Swap questions and answers if the body is clicked.
            $(document).click(function(event) {
                if ($(event.target)[0].nodeName === "HTML" || $(event.target)[0].nodeName === "BODY") {
                    Cards.swapAll()
                }
            })

            // Show a usage instruction if they're not hovering on
            // anything in particular.
            $('html').mouseover(function(event) { 
                if (event.target.nodeName === 'BODY' || event.target.nodeName === 'HTML') {
                    $('.question.selected').removeClass('selected')
                    Message.set('msg', 'Hover over a question to see the answer.') 
                }
            })

        })
