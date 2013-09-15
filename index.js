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

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
