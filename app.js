var http = require('http'), express = require('express');
var bodyParser = require("body-parser");
var backboneApp = require('./models/backboneApp');

var app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/postData', function (req, res) {
    res.send(backboneApp.postData(req.body)) ;
});

http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});