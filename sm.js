
$(function() {

    function mkGoogleUrl(str) {
        return 'http://www.google.com/search?q='+str.replace(/ /g, '+')
    }

    // enter / exit events
    $('.question').mouseenter(function(event) { 
        var txt = $(event.target).next().text()
        var link = $('<a>').attr('href', mkGoogleUrl(txt))
        $('#message').html(link.text(txt)) 
        $(event.target).addClass('selected')
    }).mouseleave(function(event) {
        $(event.target).removeClass('selected')
    })

    function ctrlKeyPressed(e) { return e.ctrlKey }

    $(document).click(function(event) {
        if (ctrlKeyPressed(event)) {
            var url = mkGoogleUrl($(event.target).text())
        }
        else {
            var url = $('#message a').attr('href')
        }
        var win=window.open(url, '_blank');
        win.blur();
        win.focus();
    })
})

