var app = app || {};

var userBookCollection = new app.BookCollection();

app.testView = Backbone.View.extend({

    el: '#book_content',
    
    bookCollection: userBookCollection,

    initialize: function (){
        this.listenTo(this.bookCollection, "update", this.render);
    },

    render: function () {
        var template = _.template('<% collection.forEach( function (item) { %> <%= item.data %> </br></hr></br><hr></br><hr></br><hr> <% });%>');        
        this.$el.append(template({collection: this.bookCollection.toJSON()}));
        return this;
    }
});

