var fs = require("fs");

var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
    var data = readJsonFile('data.json');

    res.render("home");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...!");
});

function readJsonFile(path){
    var json = fs.readFileSync(path);

    return JSON.parse(json);
}