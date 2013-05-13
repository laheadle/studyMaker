
$(function() {

    function mkGoogleUrl(str) {
        return 'http://www.google.com/search?q='+str.replace(/ /g, '+')
    }

    function select(question) {
        var txt = question.next().text()
        $('#message').text(txt) 
        $('.question').removeClass('selected')
        question.addClass('selected')
    }
    
    // enter / exit events
    $('.question').mouseenter(function(event) { 
        var target = $(event.target)
        select(target.hasClass('delete')? target.parent() : target)
    })

    function swap(question) {
        var qtext = question.text()
        var answer = question.next('.answer')
        question.text(answer.text())
        answer.text(qtext)
    }

    function swapAll() {
        $('.question').each(function() {
            swap($(this))
        });
    }

    function ctrlKeyPressed(e) { return e.ctrlKey }

    $(document).click(function(event) {
        if ($(event.target)[0].nodeName === "HTML") {
            swapAll()
            return false
        }
        if (ctrlKeyPressed(event)) {
            var url = mkGoogleUrl($(event.target).text())
        }
        else {
            var url = mkGoogleUrl($(event.target).next().text())
        }
        var win=window.open(url, '_blank');
        win.blur();
        win.focus();
    })

    $('.delete').click(function() {
        var parent = $(this).parent()
        parent.hide('fast', function(){ parent.remove(); });
        return false
    })
})

