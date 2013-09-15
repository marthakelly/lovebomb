var express = require('express'),
  app = express();

app.use(express.logger());
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.get('/:twitterHandle', function (req, res) {
  var twitterHandle = req.params.twitterHandle;
  res.send('Hello world, ' + twitterHandle);
});

if ('development' == app.get('env')) {
  app.listen(3000);
  console.log('Listening on port 3000');
}
