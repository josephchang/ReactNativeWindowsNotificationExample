import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import Thread from './Thread';
import Message from './Message';

function MessageList({ threads }) {
  console.log('threads', threads);
  return (
    <FlatList
      data={threads}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Thread
          id={item.id}
          messages={item.messages}
        />
      )}
    />
  );
}

MessageList.defaultProps = {
  threads: [],
};

MessageList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(Thread.propTypes)),
  newMessage: PropTypes.shape(Message.propTypes),
};

export default MessageList;