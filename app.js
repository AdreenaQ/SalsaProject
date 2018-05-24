var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static('public'));

// Creates the salsa app database inside of mongo
mongoose.connect("mongodb://localhost/salsa_app");

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

// USE TO CREATE A SALSA EVENT IN THE DATABASE
// salsaevent.create({
//         name: " ",
//     location: " ",
//     description: " ",
//     time: " ",
//     day: " "
        
//   }, function (err, salsaevent){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED SALSA EVENT");
//             console.log(salsaevent);
//         }
//     }
//     );


app.get("/", function(req, res){
    res.render("home");
});

app.get("/salsaevents", function(req, res){
    // Get all campgrounds from the database
    salsaEvent.find({}, function(err, salsaevents){
        if (err){
            console.log(err);
        } else {
            res.render("salsaevents", {salsaevents: salsaevents});
        }
    });
});

app.post("/salsaevents", function(req, res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newsalsaevent = {name: name, image: image};
    // Create a new campground and save to database
    salsaEvent.create(newsalsaevent, function(err, newlyCreated){
        if (err){
            console.log("There was an error");
        } else {
             res.redirect("/salsaevents");
        }
    });
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

