"use strict";

var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var mongoose = require("mongoose");
var Events = require("./Data/Events");

var xevents = new Events(mongoose);

xevents.connect();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

// Creates the salsa app database inside of mongo
mongoose.connect("mongodb://localhost/salsa_app");

mongoose.Promise = global.Promise;

var promise = new Promise(function (resolve, reject) {
    // do a thing, possibly async, then…

    if (1 === 1 /* everything turned out fine */) {
        resolve("Stuff worked!");
    }
    else {
        reject(Error("It broke"));
    }
});

promise.then(
    function (message) {
        console.log(message);
    },
    function (err) {
        console.log(err);
    });

if (false) {
    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}


if (false) {
    var SomeModelSchema = new mongoose.Schema({
        name: String,
        location: String,
        description: String,
        time: String,
        day: String
    });

    var SomeModel = mongoose.model('SalsaEvent', SomeModelSchema);

    // Create an instance of model SomeModel
    var awesome_instance = new SomeModel({
        name: "Test Event 1",
        location: "Test Location 1",
        description: "Test Description 1",
        time: "Test Time 1",
        day: "Test Day 1"
    });

    // Save the new model instance, passing a callback
    awesome_instance.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });

}

if (false) {
    // Adding a new salsa event to the Database
    var salsaSchema = new mongoose.Schema({
        name: String,
        location: String,
        description: String,
        time: String,
        day: String
    });

    // Compile into a model
    var salsaEvent = mongoose.model("salsaEvent", salsaSchema);
}

// USE TO CREATE A SALSA EVENT IN THE DATABASE
if (false) {
    if (false) {
        var inst = new salsaEvent({
            name: "Test Event 1",
            location: "Test Location 1",
            description: "Test Description 1",
            time: "Test Time 1",
            day: "Test Day 1"
        });

        inst.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
    }

    if (true) {
        salsaEvent.create({
            name: "Test Event x",
            location: "Test Location x",
            description: "Test Description x",
            time: "Test Time x",
            day: "Test Day x"

        }, function (err, q) {
            if (err) {
                console.log(err);
            } else {
                console.log("NEWLY CREATED SALSA EVENT");
                console.log(q);
            }
        }
        );
    }
}

app.get("/", function(req, res){
    res.render("home");
});

app.get("/salsaevents", function(req, res){
    // Get all campgrounds from the database
    xevents.getAll().then(
        function (data) {
            res.render("salsaevents", { salsaevents: data });
        },
        function (err) {
            console.log(err);
        }
    );
});

app.post("/salsaevents", function (req, res) {
    xevents.saveItem(
        req.body.name,
        req.body.location,
        req.body.description,
        req.body.time,
        req.body.day
    ).then(
        function (data) {
            res.redirect("/salsaevents");
        },
        function (err) {
            console.log(err);
        }
    );
});

app.get("/salsaevents/new", function(req, res){
    res.render("new");
});

// SHOW - show a single campground
app.get("/salsaevents/:id", function(req, res){
    // Find the salsa event with provided ID
    // Render show template with that salsa event
    res.render("show");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...!");
});

