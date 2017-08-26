/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import TileNotification, {
  Tile,
  Binding,
  Text,
  TILETEMPLATENAMEV3,
  TEXTSTYLE,
} from 'rn-windows-tile-notification';
import MessageList from './components/MessageList';
import messagesData from './messages.json';

const messages = [].concat(messagesData.messages);

function getRandomMessage() {
  const messageIndex = Math.floor(Math.random() * messages.length);
  const message = messages.splice(messageIndex, 1);
  return message[0] || null;
}

class ReactNativeWindowsNotificationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: [],
      newMessage: null,
    };
  }

  getNewMessage() {
    const message = getRandomMessage();
    message.date = new Date();

    const threads = [].concat(this.state.threads);

    if (!threads.length) {
      threads.push({
        id: message.threadId,
        messages: [message],
      });
    } else {
      let thread;

      for(let i=0; i < threads.length; i++) {
        if (threads[i].id === message.threadId) {
          thread = threads[i];
          thread.messages.push(message);
          break;
        }
      }

      if (thread === undefined) {
        threads.push({
          id: message.threadId,
          messages: [message],
        });
      }
    }

    this.setState({
      newMessage: message,
      threads,
    });
  }

  componentDidMount() {
    this.getNewMessage();
  }

  componentDidUpdate() {
    const tile = new Tile();
    const binding = new Binding({ template: TILETEMPLATENAMEV3.TileWide });

    const { name, body } = this.state.newMessage;
    const messageName = new Text({ 'hint-style': TEXTSTYLE.base });
    const messageBody = new Text({ 'hint-style': TEXTSTYLE.captionSubtle, 'hint-wrap': true });

    messageName.setContent(name.toUpperCase());
    messageBody.setContent((body || '').replace(/\n/g, ' ').substring(0, 100));

    binding.addChild(messageName);
    binding.addChild(messageBody);

    tile.visual.addBinding(binding);
    TileNotification.update(tile);

    console.log(tile.getXml());

    this.messageTimer = setTimeout(() => {
      this.getNewMessage();
    }, Math.random() * 20000);
  }

  componentWillUnmount() {
    clearTimeout(this.messageTimer);
  }

  render() {
    return (
      <View>
        <MessageList
          threads={this.state.threads}
          newMessage={this.state.newMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeWindowsNotificationExample', () => ReactNativeWindowsNotificationExample);