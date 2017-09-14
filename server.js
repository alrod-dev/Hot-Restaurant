// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Star Wars Characters (DATA)
// =============================================================
var reservations = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Get all reservations
app.get("/api/tables", function (req, res) {
    res.json(reservations);
});


// Get all waitlist
app.get("/api/waitlist", function (req, res) {
    res.json(waitlist);
});

// Clear all buttons
app.get("/api/clear", function (req, res) {

    reservations = [];
    waitlist = [];


    res.json(reservations);
    res.json(waitlist);

});


// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {

    if (reservations.length >= 3) {

        var newReservations = req.body;

        console.log(newReservations);

        waitlist.push(newReservations);

        res.json(newReservations);
    }

    else {


        var newReservations = req.body;

        console.log(newReservations);

        reservations.push(newReservations);

        res.json(newReservations);

    }
});



// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});
