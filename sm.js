
$(function() {

    function mkGoogleUrl(str) {
        return 'http://www.google.com/search?q='+str.replace(/ /g, '+')
    }

    function select(question) {
        var txt = question.next().text()
        $('#message').text(txt) 
        $('.question.selected').removeClass('selected')
        question.addClass('selected')
    }
    
    // enter / exit events
    $('.question').mouseenter(function(event) { 
        var target = $(event.target)
        select(target.hasClass('delete')? target.parent() : target)
    })

    function swap(question) {
        var oldq = question
        .clone() 
        .children()
        .remove()
        .end()
        .text();
        var answer = question.next('.answer')
        var del = question.children()
        question.text(answer.text()).append(del)
        answer.text(oldq)
        clickHandle(del)
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
            var url = mkGoogleUrl($(event.target).clone()    //clone the element
                                  .children() //select all the children
                                  .remove()   //remove all the children
                                  .end()  //again go back to selected element
                                  .text());
        }
        else {
            var url = mkGoogleUrl($(event.target).next().text())
        }
        var win=window.open(url, '_blank');
        win.blur();
        win.focus();
    })


    function clickHandle(del) {
        del.click(function() {
            var parent = $(this).parent().parent()
            parent.hide('slow', function(){ parent.remove(); });
            return false
        })
    }
    clickHandle($('.delete'))
})

