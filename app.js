var PORT = process.env.PORT || 3000;
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seed');


seedDB();

mongoose.connect('mongodb://localhost/yelpcamp');
var app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Sets the view engine to ejs
app.set('view engine', 'ejs');




// Landing page
app.get('/', function(req, res) {
    res.render('landing');
});


// Campground link
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { campgrounds: campgrounds });
        }
    });
});



// Show add campground form
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});



// To post a campground
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('campgrounds');
        }
    });
});



// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('show', { campground: foundCampground });
        }
    });
});



// ================================
// Comment routes
// ================================ 
app.get('/campground/:id/comments/new', function(req, res) {
    res.send('This will be the comment form');
});

// Connect to server
app.listen(PORT, process.env.IP, function() {
    console.log('Yelpcamp has started');
});
