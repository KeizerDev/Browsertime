var express = require('express');
var request = require('request');
var babelify = require('babelify');
var browserify = require('browserify-middleware');
var less = require('less-middleware');
var nunjucks = require('nunjucks');
var config = require('./client/config');
var parseTorrent = require('parse-torrent')

// initialise express
var app = express();
var router = express.Router();

// use nunjucks to process view templates in express
nunjucks.configure('server/templates/views', {
    express: app
});

// less will automatically compile matching requests for .css files
app.use(less('public'));
// public assets are served before any dynamic requests
app.use(express.static('public'));

// common packages are precompiled on server start and cached
app.get('/js/' + config.common.bundle, browserify(config.common.packages, {
	cache: true,
	precompile: true
}));

// any file in /client/scripts will automatically be browserified,
// excluding common packages.
app.use('/js', browserify('./client/scripts', {
	external: config.common.packages,
	transform: [babelify.configure({
		plugins: ['object-assign']
	})]
}));


router.get('/', function(req, res) {
    // res.json();
});

router.get('/torrent/:torrUrl*', function(req, res) {
	parseTorrent.remote(decodeURI(req.params.torrUrl), function (err, parsedTorrent) {
	  	var uri = parseTorrent.toMagnetURI({
		  infoHash: parsedTorrent.infoHash
		}) 
	  	res.json({uri})
	})
});

router.get('/movies', function(req, res) {
	request('https://yts.ag/api/v2/list_movies.json?sort_by=date_added&order_by=desc', function (error, response, body) {
    	res.json(JSON.parse(body));
	});
});

router.get('/movies/:query', function(req, res) {

	/*
{"status":"error","status_message":"Query not successful",]},"@meta":{"server_time":1432814403,"server_timezone":"Pacific\/Auckland","api_version":2,"execution_time":"0.71164512634277 sec"}}
	fix error when search fails
	*/
 	request('https://yts.ag/api/v2/list_movies.json?query_term=' + req.params.query, function (error, response, body) {
    	console.log(body)
    	res.json(JSON.parse(body));
	});
});

router.get('/movie/:id', function(req, res) {
    request('https://yts.ag/api/v2/movie_details.json?with_images=true&movie_id=' + req.params.id, function (error, response, body) {
        res.json(JSON.parse(body));
    });
});

app.use('/api', router);

app.get('*', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
    res.render('index.html');
});



// start the server
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
