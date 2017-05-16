var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');

var init_notes = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));


app.get("/notes", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (!req.session.notes) {
        req.session.notes = init_notes;
    }
    res.send(req.session.notes);
});

app.listen(8080);


/*

 FOLDER STRUCTURE:

 root
 app
 server
 server.js
 package.json
 index.html
 package.json

 */
  