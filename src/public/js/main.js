$(document).ready(function() {

    $(".button-collapse").sideNav();
    $('select').material_select();

});

$(function () {

    var App = App || {
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

    var testModel = new App.Models.StyleModel();

    App.Views.StyleView = Backbone.View.extend ({

        el: '#app',

        tagName : 'style',

        template : template(styleTemplate),

        testModel : testModel,

        initialize: function () {

            this.listenTo(this.testModel, "change", this.render);

            this.render();
        },

        render : function (){
            var template = _.template($("#styleTemplate").html());
            this.$el.html( template (this.testModel.toJSON()) );
            console.log('model');
            console.log(this.testModel.toJSON());
            return this;
        }
    });

    new App.Views.StyleView();

    $('#fontSize').change(function () {
        var fontSize = $('#fontSize').val() + 'px';
        testModel.set({fontSize : fontSize});
    });

    $( "#text-align" ).change(function() {
        var textAlign = $( "#text-align option:selected" ).val();
        testModel.set({textAlign : textAlign});
    });

    $('#commit_changes').on('click', function () {
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('user_id');
        var settings = testModel.toJSON();

        $.ajax('/postData', {
            method: 'post',
            data: {
                token:token,
                id:user_id,
                fontFamily:settings.fontFamily,
                fontSize:settings.fontSize,
                color:settings.color,
                textAlign:settings.textAlign
            }
        }).done(function (data) {
            Materialize.toast(data.message, 3000, 'rounded')

        });
    });

    $('.login_out').on('click', function () {
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

    $('#loadBook').on('click', function () {
        var book = $('#textarea1').val();

        $.ajax('/uploadNewBook', {
            method: 'post',
            beforeSend:window.backbone.setHeader,
            data: {
                data:book
            }
        }).done(function (data) {
            /*console.log(data);*/
            $('#sampleLoadBook').html(data.data);
            $('#outputText').val(data.data);
        });



    });


});
