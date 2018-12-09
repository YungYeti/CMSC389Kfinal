var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var _ = require('underscore');

var Song = require('./models/Song');

// Load envirorment variables
dotenv.load();

console.log(process.env.MONGODB);

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error',function(err){
    console.log("Connection was unable to take place");
    process.exit(1);
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var Song = require('./models/Song');

var http = require('http').Server(app);

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others. 
 */

app.get('/', function(req, res) {
    Song.find({}, function(err, songs) {
        return res.render('songs', { songs: songs });
    });
})

app.post('/api/addSong', function(req, res) {
    // Create new song
    var features = req.body.features;
    if(features === ""){
        features = [];
    }else{
        features = features.split(",");
    }
    var song = new Song({
        name: req.body.name,
        year: parseInt(req.body.year),
        artist: req.body.artist,
        album: req.body.album,
        features: features
    });

    // Save song to database
    song.save(function(err){
        if (err) throw err;
        return res.send('Successfully inserted song!');
    });
});

app.get('/getSongs', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) throw err;
        res.send(songs);
    });
});

app.get('/kayne', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) throw err;
        var kayne = _.where(songs, {artist: 'Kayne'})
        return res.render('kayne', {songs: kayne});
    });
});;

app.get('/singles', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) throw err;
        var singles = _.filter(songs, function(a) {
            return a && a.features.length === 0;
        })
        return res.render('singles', {songs: singles});
    });
});;

app.get('/new', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) throw err;
        var newest = _.where(songs, {year: 2018})
        return res.render('newest', {songs: newest});
    });
});;

app.get('/old', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) throw err;
        var old = _.filter(songs, function(a) {
            return a && a.year < 2018;
        })
        return res.render('old', {songs: old});
    });
});;

app.get('/random', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) throw err;
        var kayne = songs[ Math.floor(Math.random() * songs.length) ]
        return res.render('random', {songs: kayne});
    });
});;


app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
