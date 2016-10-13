var app = app || {};

app.BookCollection = Backbone.Collection.extend({

    model: app.BookModel,

    url: function () {
            return '/downloadBook/' + (this.id ? this.id : 0);
        }
});