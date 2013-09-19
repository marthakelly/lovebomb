// TODO: fix links in tweet text

// dependency list
var express = require('express'),
  twit = require('twit'),
  handlebars = require('handlebars'),
  consolidate = require('consolidate'),
  config = require('./config.json');

// testing
var fixture = require('./fixture.json');

var app = express();

var twitter = new twit({
  consumer_key:        config.CONSUMER_KEY,
  consumer_secret:     config.CONSUMER_SECRET,
  access_token:        config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
});

var formatURL = function(text) {
  var exp = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  return text.replace(exp, '<a href="$1" target="_blank">$1</a>');
};

var processLinks = function(tweets) {
  for (var i = 0; i < tweets.statuses.length; i++) {
    tweets.statuses[i].text = formatURL(tweets.statuses[i].text);
  }
  return tweets;
};

app.engine('html', consolidate.handlebars);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.logger());

// show all lovebombs
app.get('/', function (req, res) {
  res.render('index');
});

// show lovebombs for particular twitter user
app.get('/:username', function (req, res) {
  var params = {
    q: req.params.username + '%20%23lovebomb+exclude:retweets',
    count: 100
  };

  twitter.get('search/tweets', params, function(err, tweets) {
    // testing
    fixture = processLinks(fixture);
    res.render('user', fixture);
    // production
    /*
    if (err) {
      res.send('404 Not found', 404);
    } else {
      tweets = processLinks(tweets);
      res.render('user', tweets);
    }
    */
  });
  /*
   * Upcoming:

   * might use streaming API
   * var stream = twitter.stream('statuses/filter', { track: ['lovebomb', req.params.username] });

   * stream.on('tweet', function (tweet) {
   *   do stuff with tweet
   * });

   * might allow instagram pictures as background of lovebombs
  */
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
