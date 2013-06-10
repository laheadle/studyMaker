

define(['underscore', 'backbone', 'jquery', 'sheetModel'], function (_, Backbone, $, SheetModel) {
    var Sheets = new (Backbone.Collection.extend({
        model: SheetModel,
    }))

    return Sheets
})