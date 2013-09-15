// dependency list
var express = require('express'),
  twit = require('twit'),
  handlebars = require('handlebars'),
  consolidate = require('consolidate'),
  config = require('./config.json');

var app = express();

var twitter = new twit({
  consumer_key:        config.CONSUMER_KEY,
  consumer_secret:     config.CONSUMER_SECRET,
  access_token:        config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
});

app.use(express.logger());
app.engine('html', consolidate.handlebars);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// show all lovebombs
app.get('/', function (req, res) {
  res.send('Hello world');
});

// show lovebombs for particular twitter user
app.get('/:username', function (req, res) {
  var params = {
    q: req.params.username + '%20%23lovebomb+exclude:retweets',
    count: 100
  };

  twitter.get('search/tweets', params, function(err, tweets) {
    if (err) {
      res.send('404 Not found', 404);
    } else {
      res.render('user', tweets);
    }
  });

  /*
  var stream = twitter.stream('statuses/filter', { track: ['jsconfeu'] });

  stream.on('tweet', function (tweet) {
    do stuff with tweet.text
  });
  */

});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
