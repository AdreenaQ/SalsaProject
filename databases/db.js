var mongoose = require("mongoose");

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
var salsaevent = mongoose.model("salsaevent", salsaSchema);

salsaevent.create({
        name: "Fun salsa times",
        location: "Central London",
        description: "Fun for over 50s to learn salsa",
        time: "3pm",
        day: "thursday"
        
   }, function (err, salsaevent){
        if (err){
            console.log(err);
        } else {
            console.log("NEWLY CREATED SALSA EVENT");
            console.log(salsaevent);
        }
    }
    );

// var salsafun = new salsaevent({
//     name: "SalsaFun",
//     location: "Holborn",
//     description: "Fun fun fun"
// })

// salsafun.save(function(err, salsaevent){
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("We just saved a salsa event to the database");
//         console.log(salsaevent);
//     }
// });

// Read the file



