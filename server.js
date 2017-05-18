var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
//var cors = require('cors');
var MongoStore = require('connect-mongo/es5')(session);
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var db = new Db('ng2-notes',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

var ObjectID = require('mongodb').ObjectID;

db.open(function () {
    db.collection('notes', function (error, notes) {
        db.notes = notes;
    });
    db.collection('sections', function (error, sections) {
        db.sections = sections;
    });
    console.log("mongo db is opened!");
});



var notes_initial = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

//add cors support to express
//app.use(cors());
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Origin', req.header("origin"));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);


//set up body parser
app.use(bodyParser.urlencoded({hasExtendedUnicodeEscape: true}));
app.use(bodyParser.json());


app.use(session({
    store: new MongoStore({url: 'mongodb://localhost:27017/ng2-notes'}),
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

var root = __dirname + '/..'
app.use(express.static(root));

//get default notes from session
app.get("/notes", function (req, res) {
    db.notes.find(req.query).toArray(function (err, items) {
        res.send(items);
    });

});

//add new note to session
app.post("/notes", function (req, res) {
    // var note = req.body;
    // console.log("adding note", req.session.notes);
    // req.session.notes.push(note);
    db.notes.insert(req.body);
    res.end();
});


app.delete("/notes", function (req, res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function (err) {
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

app.get("/sections", function (req, res) {
    db.sections.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
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
  