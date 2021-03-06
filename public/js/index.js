$(document).ready(function() {
    window.backbone = (function () {

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
            }
        });

        var getUserSettings = function (id) {
            testModel.fetch(id);
        };



        var testModel = new App.Models.StyleModel();

        App.Views.StyleView = Backbone.View.extend ({
            el: '#app',

            tagName : 'style',

            template : template(styleTemplate),

            testModel: testModel,

            initialize: function () {

                this.listenTo(this.testModel, "change", this.render);
                this.render();


            },

            render : function (){
                var template = _.template($("#styleTemplate").html());
                this.$el.html( template (this.testModel.toJSON()) );
                return this;
            }


        });

        var loginUser = function () {

            var user_login = $('#login_user').val();
            var user_pw = $('#pw_user').val();
            $.ajax('/login', {
                method: 'POST',
                data: {
                    login: user_login,
                    pw: user_pw
                }
            }).done(function (data) {
                if (data.success) {
                    sessionStorage.setItem('token', data.userToken);
                    sessionStorage.setItem('user_id', data.id);
                    $('.registration_btn').hide();
                    $('.cabinet').css('display','inline-block');
                    $('.login-btn').hide();
                    $('.logout-btn').css('display','inline-block');                    
                    loadSetings(data.userToken, data.id);
                    Materialize.toast('Login successful !', 3000, 'rounded');
                }  else {
                    Materialize.toast('Login failed !', 3000, 'rounded');
                }
            });
        };

        var registration = function () {

            var first_name = $('#first_name').val();
            var last_name = $('#last_name').val();
            var login = $('#login').val();
            var password = $('#password').val();
            var email = $('#email').val();

            $.ajax('/registration', {
                method: 'POST',
                data: {
                    first_name:first_name,
                    last_name:last_name,
                    login:login,
                    password:password,
                    email:email
                }
            }).done(function (data) {
                Materialize.toast(data.message, 3000, 'rounded')
            });
        };

        window.loadSetings = function (token, id) {
            $.ajax('/getData', {
                method: 'post',
                data: {
                    token:token,
                    id:id
                }
            }).done(function (data) {
                testModel.set({
                    'fontFamily' : data.fontFamily,
                    'fontSize' : data.fontSize,
                    'color' : data.color,
                    'textAlign' : data.textAlign
                });

            });
        };

        $('.logout-btn').on('click', function () {
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

        $('.cabinet').on('click', function () {
            if (sessionStorage.getItem('token')) {
                Materialize.toast(data.message, 3000, 'Login first')
            }
        });


        $("#pw_user").keyup(function(event){
            if(event.keyCode == 13){
                $("#login-btn-link").click();
            }
        });

        new App.Views.StyleView();

        $(".button-collapse").sideNav();

        $('.modal-trigger').leanModal();

        if (sessionStorage.getItem('token')) {
            $('#registration_btn').css('display','none');
            $('.cabinet').css('display','inline-block');
            $('.login-btn').hide();
            $('.logout-btn').css('display','inline-block');
            loadSetings(sessionStorage.getItem('token'), sessionStorage.getItem('user_id'));
        } else {
            $('.registration_btn').css('display','inline-block');
            $('.login-btn').show();
        }

        return {
            loginUser:loginUser,
            registration:registration,
            loadSetings:loadSetings,
            getUserSettings:getUserSettings
        }
    })();
});