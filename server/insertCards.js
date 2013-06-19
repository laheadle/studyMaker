define(function(require) {
    var async = require("async")

    return function(connection, cards, sheetId, callb) {
        async.whilst(
            function() { return cards.length > 0 },
            function(callb) {
                var card = cards.shift()
                card.csheet = sheetId
                connection.query('insert into tcard SET ?', card, function(err, result) {
                    callb(err)
                })
            },
            function (err) { 
                if (err) { throw err }
                callb(null)
            }
        )
    }
})