// Dependencies
var express = require('express')
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set Handlebars.
var exphbs = require("express-handlebars");

// Requiring comment and Article models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Import routes 
var routes = require("./routes/routes.js");


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/mongo-scraper", function(){
	 /* Drop the DB */
    mongoose.connection.db.dropDatabase();
});
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.use("/", routes);



// Listen on port 3001
app.listen(8080, function() {
  console.log("App running on port 8080!");
});

module.exports= db;