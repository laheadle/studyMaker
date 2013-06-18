require(
    ['jquery', 'cards', 'messageView', 'cardsApp', 'text!tmpl/cardsApp.html'], 
    function ($, Cards, MessageView, CardsApp, tmpl) {

        var messageView = new MessageView({
            el: $('#message')
        })
        
        // The app Element must already be in the DOM when CardsApp is
        // constructed, because CardsApp creates CardViews, each of which
        // immediately, but briefly, creates and attaches an Element to
        // its parent (CardsApp) to determine its own own proper height.
        var appElt = $(tmpl)
        appElt.appendTo($('body'))

        var cardsApp = new CardsApp({
            el: appElt
        })

        // Initialize the collection of cards from inline json data.
        Cards.reset(JSON.parse($('#questions').text()))
    })
