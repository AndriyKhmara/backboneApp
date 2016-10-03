var app = app || {};

app.TestCollection = Backbone.Collection.extend({

    model: app.TestModel,

    url: '/data'
});