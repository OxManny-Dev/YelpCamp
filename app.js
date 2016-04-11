var PORT = process.env.PORT || 3000;
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelpcamp');
var app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Sets the view engine to ejs
app.set('view engine', 'ejs');

//SChema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});


var Campground = mongoose.model('Campground', campgroundSchema);



// Landing page
app.get('/', function(req, res){
	res.render('landing');
});


// Campground link
app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		}else {
			res.render('campgrounds', {campgrounds: campgrounds});
		}
	});
});


// Show add campground form
app.get('/campgrounds/new', function(req , res){
	res.render('new');
});

// Show single campground
app.get('campgrounds/:id', function(req, res){
	Campground.findById({req.body.id}, function(err, campground){
		if(err){
			console.log(err);
		} else {

		}
	})
});



// To post a campground
app.post('/campgrounds', function(req , res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name:name, image:image, description: description};
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.redirect('campgrounds');
		}
	});
});


// Connect to server
app.listen(PORT, process.env.IP, function(){
	console.log('Yelpcamp has started');
});