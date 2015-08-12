var express = require('express');
var app = express();

app.use(express.static('app'));

app.get('/john', function(req, res) {
  res.send('hello john');
});


app.listen(3000);
