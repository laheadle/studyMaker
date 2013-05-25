require(['underscore', 'backbone', 'jquery', 
         'cardview', 'message', 'sheet', 'messageView', 'app'], 
        function (_, Backbone, $, CardView, Message, Sheet) {

            Sheet.reset(JSON.parse($('#questions').text()))

            $('body').animate({'opacity': 1}, 300)

            $(document).click(function(event) {
                if ($(event.target)[0].nodeName === "HTML" || $(event.target)[0].nodeName === "BODY") {
                    Sheet.swapAll()
                }
            })

            $('html').mouseover(function(event) { 
                if (event.target.nodeName === 'BODY' || event.target.nodeName === 'HTML') {
                    $('.question.selected').removeClass('selected')
                    Message.set('msg', 'Hover over a question to see the answer.') 
                }
            })

        })
