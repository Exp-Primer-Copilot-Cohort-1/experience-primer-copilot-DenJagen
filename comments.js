// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var commentsPath = path.join(__dirname, 'comments.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/comments.json', function(req, res) {
  fs.readFile(commentsPath, 'utf8', function(err, data) {
    if (err) {
      console.log('Error reading comments file: ', err);
      res.status(500).send('Error reading comments file');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments.json', function(req, res) {
  fs.readFile(commentsPath, 'utf8', function(err, data) {
    if (err) {
      console.log('Error reading comments file: ', err);
      res.status(500).send('Error reading comments file');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), function(err) {
      if (err) {
        console.log('Error writing comments file: ', err);
        res.status(500).send('Error writing comments file');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});