require(['underscore', 'backbone', 'jquery', 
         'sheetList', 'sheetListApp'], 
        function (_, Backbone, $, SheetList) {

            SheetList.reset(JSON.parse($('#payload').text()))

            $('body').animate({'opacity': 1}, 300)

        })

