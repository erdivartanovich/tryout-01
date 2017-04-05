const express = require('express');
const http = require('http')
const socketio = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
const port = 3000;
console.log('starting server on port :', port );
server.listen(port, '0.0.0.0');

// Init empty objects for client, user
const clients = {};
const user = {};

// init storage for user and messages
const users = [];
const messages = [
  {
    chatId: 1, 
    _id: getRandomInt(), 
    text: 'welcome to the channel',
    user: {
      _id: 999, 
      name: 'Server-Bot' , 
    },
    createdAt: new Date(moment()),
  },
  {
    chatId: 2, 
    _id: getRandomInt(), 
    text: 'Just Say Something here',
    user: {
      _id: 999, 
      name: 'Server-Bot', 
    },
    createdAt: new Date(moment()),
  }
];

// Init channel ID
const chatId = 1;

websocket.on('connection', (socket) => {
    clients[socket.id] = socket;
    socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
  try {
    if (!userId) {
      const idx = users.length + 1;
      const new_user = {
        _id: `user-${idx}`,
        name: `user ${idx}`
      }
      //add the new user to storage
      users.push(new_user);
      //emit user joined message
      console.log('new user is joined: ', new_user);
      socket.emit('userJoined: ', new_user._id);
      user[socket.id] = new_user._id;
      _sendExistingMessages(socket);
    } else {
      user[socket.id] = userId;
      console.log('socket:', socket);
      _sendExistingMessages(socket);
    }

  } catch(err) {
    console.log(err);
  }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  const userId = user[senderSocket.id];
  console.log(`${userId} is sending message: ${message.text} at ${message.createdAt}`);
  if (!userId) return;
  _sendAndSaveMessage(message, senderSocket);
}

// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  const messages = getMessages();
  //return if empty
  if (!messages.length) return;
  // emit the last messages reservely, newest on the top
  socket.emit('message', messages.reverse());
}

function getMessages() {
  return messages;
}

function _sendAndSaveMessage(message, socket, fromServer) {
  const messageData = {
    _id: message._id,
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };
  //save the messages
  messages.push(messageData);
  // If the message is from the server, then send to everyone.
  const emitter = fromServer ? websocket : socket.broadcast;
  emitter.emit('message', [message]);
}

// Allow the server to participate in the chatroom through stdin.
const stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    user: { _id: 'Server-Bot', name: 'Server-Bot' }
  }, null /* no socket */, true /* send from server */);
});

function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(9999);
  return Math.floor(Math.random() * (max - min)) + min;
}
