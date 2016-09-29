var FormView = Backbone.View.extend({
    events: {
        'submit': 'onSubmit'
    },

    initialize: function() {
        this.listenTo(this.model, 'edit', this.onEdit);
    },

    onEdit: function(model) {

    },

    onSubmit: function(e) {
        var tuples = _.map(this.$el.serializeArray(), function(el) {
            return [el.name, el.value];
        });

        this.model.add(_.object(tuples));

        e.preventDefault();
    }
});

var TableView = Backbone.View.extend({
    template: _.template($('#tableTemplate').text()),

    events: {

    },

    initialize: function() {
        this.listenTo(this.model, 'add', this.addRow);
        this.listenTo(this.model, 'destroy', this.removeRow);
        this.render();
    },

    addRow: function(model) {
        var ctrl = new RowView({model: model});
        var el = ctrl.render();
        this.$el.find('tbody').append(el);
    },

    removeRow: function(model) {
        model.controller.$el.remove();
    },

    render: function() {
        return this.$el.html(this.template({models: this.model}));
    }
});

var RowView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#trTemplate').text()),

    events: {
        'click .glyphicon-trash': 'remove'
    },

    initialize: function() {
        this.model.controller = this;
    },

    remove: function() {
        this.model.destroy();
    },

    render: function() {
        return this.$el.html(this.template(this.model.attributes));
    }
});

var Address = Backbone.Model.extend({
    url: "postData"
});

var AddressBook = Backbone.Collection.extend({
    model: Address
});

var myAddressBook = new AddressBook();

var ctrl = new FormView({
    el: $('form'),
    model: myAddressBook
});

var table = new TableView({
    el: $('#table'),
    model: myAddressBook
});

myAddressBook.add({
    'firstname': 'Petya',
    'lastname': 'Vasilek',
    'street': 'Kikvidze',
    'number': '22-13-68',
    'zip': '33000',
    'email': 'Petya.Vasilek@gmail.com'
});




$('#saveData').on('click', function(){
    var name = $('#firstname').val();    
    var user = myAddressBook.find(function (user) { 
        console.log(user.get('firstname') + ' === ' + name);
        return user.get('firstname') === name;
    });

    user.save();    
});
