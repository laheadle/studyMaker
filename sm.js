
$(function() {

    $('.question').mouseenter(function() { $(event.target).next().show() })
        .mouseleave(function() { $(event.target).next().hide() })
})

                                         