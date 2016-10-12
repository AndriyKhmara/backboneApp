var app = app || {};

app.AppView = Backbone.View.extend({
    // el: '#book_content',
    //
    // bookCollection : new app.BookCollection(),
    //
    // template :  _.template($("#readBookTemplate").html()),
    //
    // initialize: function (){
    //     this.listenTo(this.bookCollection, "update", this.render);
    //     this.bookCollection.fetch();
    //
    // },
    //
    // render: function () {
    //
    //     // this.$el.html( template (this.bookCollection.toJSON()) );
    //     _.each(this.bookCollection.models, function (model) {
    //         console.log(this.template (model.toJSON()));
    //         this.$el.html( this.template (model.toJSON()) );
    //     });
    //     return this;
    // }
    
});



app.testView = Backbone.View.extend({

    el: '#book_content',

    bookCollection: new app.BookCollection(),

    bookModel : new app.BookModel(),

    setHeader : function (xhr){
        xhr.setRequestHeader('token', 'testToken');
    },

    

    initialize: function (){
        this.listenTo(this.bookCollection, "update", this.render);
        this.bookCollection.fetch({
            beforeSend : this.setHeader
        });
    
    },

    render: function () {
        // var template = _.template($("#readBookTemplate").html());
        // // this.$el.html( template (this.bookCollection.toJSON()) );
        // // console.log(this.bookCollection.toJSON());
        // this.$el.html(template({collection: this.bookCollection}));
        // // console.log(this.$el.html(template({collection: this.bookCollection})));
        // this.bookCollection.forEach( function (item) {
        //     console.log(item);
        // });
        
        var template = _.template('<% collection.forEach( function (item) { %> <%= item.data %> </br></hr></br><hr></br><hr></br><hr> <% });%>');
        this.$el.append(template({collection: this.bookCollection.toJSON()}));
        return this;
    }
});

