
define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
    var M = Backbone.Model.extend({
        urlRoot: '/sheet',
    })

    return M
})