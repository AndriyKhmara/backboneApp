var app = app || {};

app.TestModel = Backbone.Model.extend({
    //url: '/data/' + this.id    

    url: function () {
        return '/uploadBook/' + (this.id ? this.id : 0);
    }
});