require(['underscore', 'backbone', 'jquery', 
         'sheets', 'sheetsApp'], 
        function (_, Backbone, $, Sheets) {

            Sheets.reset(JSON.parse($('#payload').text()))

            $('body').animate({'opacity': 1}, 300)

        })

