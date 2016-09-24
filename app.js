'use strict'
var http = require('http'), express = require('express');
var bodyParser = require("body-parser");
var backboneApp = require('./models/backboneApp');
var app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/getSettings', function (req, res) {
    res.send(backboneApp.getSettings());
});

app.post('/registration', function (req, res) {
    res.send(backboneApp.registration(req.body)) ;
});

app.post('/login', function (req, res) {
    res.send(backboneApp.login(req.body)) ;
});

app.post('/getData', function (req, res) {
    res.send(backboneApp.getData(req.body)) ;
});

app.post('/postData', function (req, res) {
    res.send(backboneApp.postData(req.body)) ;
});

app.post('/logout', function (req, res) {
    res.send(backboneApp.logout(req.body)) ;
});

app.post('/post2', function (req, res) {
    res.send(backboneApp.postPost(req.body)) ;
});




http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});
