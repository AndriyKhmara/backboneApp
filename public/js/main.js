$(function () {
    window.App = {
        Models : {},
        Views : {},
        Collections : {}
    };

    window.template = function (id) {
        return _.template( $(id).html() );
    };


    App.Models.StyleModel = Backbone.Model.extend ({
        defaults : {
            'fontFamily' : 'Arial',
            'fontSize' : '12px',
            'color' : 'black',
            'textAlign' : 'justify'
        },
        urlRoot : '/getSettings'
    });

    App.Views.StyleView = Backbone.View.extend ({
        tagName : 'style',
        
        template : template(styleTemplate),
        
        render : function (){
            var template = this.template(this.model.toJSON());
            this.$el.html( template );
            return this;
        }
    });

    var testModel = new App.Models.StyleModel();
    var testView = new App.Views.StyleView({model : testModel});


    $(document.body).append(testView.render().el);

    $('#fontSize').change(function () {
        var fontSize = $('#fontSize').val() + 'px';
        testView.model.set({fontSize : fontSize});
        $(document.body).append(testView.render().el);
        console.log(testModel.toJSON());
    });

    $('select').material_select();

    $( "#text-align" ).change(function() {
        var textAlign = $( "#text-align option:selected" ).val();
        testView.model.set({textAlign : textAlign});
        $(document.body).append(testView.render().el);
    });

    $('#commit_changes').on('click', function () {
        var token = sessionStorage.getItem('token');
        var id = sessionStorage.getItem('user_id');
        var settings = testModel.toJSON();        

        $.ajax('/postData', {
            method: 'post',
            data: {
                token:token,
                id:id,
                fontFamily:settings.fontFamily,
                fontSize:settings.fontSize,
                color:settings.color,
                textAlign:settings.textAlign
            }
        }).done(function (data) {
            Materialize.toast(data.message, 3000, 'rounded')
            
        });
    });

    $('#login_out').on('click', function () {
        var token = sessionStorage.getItem('token');
        $.ajax('/logout', {
            method: 'post',
            data: {
                token:token
            }
        }).done(function (data) {
            if (data) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('id');
                window.location.href = 'index.html';
            } {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('id');
                window.location.href = 'index.html';
            }
        });
    });


});
