

define(['underscore', 'backbone', 'jquery', 'sheetModel'], function (_, Backbone, $, SheetModel) {
    var SheetList = new (Backbone.Collection.extend({
        model: SheetModel,
    }))

    return SheetList
})