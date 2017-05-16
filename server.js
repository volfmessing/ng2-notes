var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');

var notes_initial = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

//get default notes from session
app.get("/notes", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (!req.session.notes) {
        req.session.notes = notes_initial;
    }
    res.send(req.session.notes);
});

//add new note to session
app.post("/notes", function (req, res) {
    var note = req.body;
    console.log("adding note", req.session.notes);
    req.session.notes.push(note);
    res.end();
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
  