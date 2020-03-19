const WebSocket = require('ws');
const http = require('http')
const path = require('path')
const session = require('express-session');
const express = require('express');
const uuid = require('uuid');

const clients = new Set();
const app = express();
const map = new Map();

//Using middleware
const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
});
app.use(sessionParser);
app.use(express.static(__dirname + '/public'))

//Defining routes

app.post('/login', function(req, res) {
  const id = uuid.v4();
  console.log('Login route fetched');
  req.session.userId = id;
  res.send({ result: 'OK', message: 'Session updated' })
});

app.delete('/logout', function(request, response) {
  const ws = map.get(request.session.userId);
  console.log('Destroying session');
  request.session.destroy(function() {
    if (ws) ws.close();

    response.send({ result: 'OK', message: 'Session destroyed' });
  });
});

const server = http.createServer(app)
const wss = new WebSocket.Server({clientTracking: false, noServer: true});

server.on('upgrade', function(request, socket, head){
  console.log('Upgrade event handler');
  sessionParser(request, {}, () => {
    console.log('Session parser')

    if (!request.session.userId) {
      console.log('Parsing failed');
      socket.destroy();
      return null;
    }
    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function(ws) {
      wss.emit('connection', ws, request);
    });
  });
})


server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});

wss.on('connection', function(ws, request) {
  const userId = request.session.userId;

  map.set(userId, ws);

  ws.on('message', function(message) {
    //
    // Here we can now use session parameters.
    //
    console.log(`Received message ${message} from user ${userId}`);
  });

  ws.on('close', function() {
    map.delete(userId);
  });
});