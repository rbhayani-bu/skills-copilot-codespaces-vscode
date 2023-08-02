// Create web server
var express = require('express');
// Create the app
var app = express();
// Create the server
var server = require('http').createServer(app);
// Create socket.io server
var io = require('socket.io')(server);
// Create the port
var port = process.env.PORT || 3000;
// Create the comments array
var comments = [];
// Create the routing
app.use(express.static(__dirname + '/public'));
// Create the connection
io.on('connection', function(socket) {
  // Emit the comments
  socket.emit('comments', comments);
  // On new comment
  socket.on('comment', function(data) {
    // Push the comment
    comments.push(data);
    // Emit the comment
    io.emit('comment', data);
  });
});
// Start the server
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});