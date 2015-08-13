var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var jsonparser = bodyParser.json();

app.use(express.static('app'));

var todos = JSON.parse('[]');


app.get('/todos', function(req, res) {
    console.log("Getting list of todos");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(todos));
});

app.get('/todos/:title', function(req, res) {
    for (var t in todos){
      if (todos[t].title === req.params.title) {
        console.log("Retrieving todo: " + todos[t].title);
        res.end(JSON.stringify(todos[t]));
      }
    }
    res.end("");
});


app.delete('/todos/:title', function(req, res) {
    for (var t in todos){
      if (todos[t].title === req.params.title) {
        console.log("Deleting todo: " + todos[t].title);
        todos.splice(t, 1); 
        res.end("OK");
      }
    }
    res.end("NOTFOUND");
});

app.post ('/todos', jsonparser, function(req, res) {
    
    console.log("Adding todo: " + req.body.title);
    req.body.local = false;
    todos.push(req.body);
    
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.body));
}); 

app.get('/john', function(req, res) {
  res.send('hello john');
});


app.listen(3000);
