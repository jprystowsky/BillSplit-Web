
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');


var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.cookieParser('some secret'));
app.use(express.session({
	secret: 'some secret',
	cookie: {
		maxAge: 1000 * 100000
	}
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
};



// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partial);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Set a 60 second timeout to drop connections (we send Connection: Keep-Alive) so that we don't exhaust server
 * resources.
 */
server.on('connection', function (socket) {
	socket.setTimeout(60 * 1000);
});