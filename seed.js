 var mongoose = require('mongoose');
 var Campground = require('./models/campground');
var Comment = require('./models/comment');
 var data = [{
     name: 'Cloud\'s Rest',
     image: 'https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg',
     description: 'blah blah blah'
 }, {
     name: 'Lala Land',
     image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg',
     description: 'blah blah blah'
 }, {
     name: 'The Bubble',
     image: 'https://farm5.staticflickr.com/4048/4661960920_a9bd6d972f.jpg',
     description: 'blah blah blah'
 }];

 function seedDB() {
     // Remove all Campgrounds
     Campground.remove({}, function(err) {
         if (err) {
             console.log(err);
         } else {
             console.log('Removed campgrounds');
         }
         // Add a few campgrounds
         data.forEach(function(seed) {
             Campground.create(seed, function(err, campground) {
                 console.log('Campground added!');
                 // create a comment
                 Comment.create({
                     text: 'This place is great, but I wish there was intgernet!',
                     author: 'Homer'
                 }, function(err, comment) {
                     if (err) {
                         console.log(err);
                     } else {
                         campground.comments.push(comment);
                         campground.save();
                         console.log('Created new comment')
                     }
                 });
             });
         });
     });
 }

 module.exports = seedDB;
