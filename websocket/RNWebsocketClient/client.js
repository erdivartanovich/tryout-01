import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const USER_ID = '@userId';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('http://10.0.2.2:3000');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  
  // When a user joins the chatroom, check if they are an existing user.
  // Set the userId to the component's state.

  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }

  // Event listeners, to receive message from server
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  //send message to the server and update this component state
  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  render() {
    const user = { 
        _id: this.state.userId|| -1,
        name: 'kajsdfkljdas',
        avatar: './avatar.png'
    };

    return (
        <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={user}
        />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

module.exports = Main;
