import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Message from './Message';

function Thread({ messages }) {
  const message = messages[messages.length - 1];
  return (
    <View>
      <Message {...message} />
    </View>
  );
}

Thread.defaultProps = {
  messages: [],
};

Thread.propTypes = {
  id: PropTypes.number.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
};

export default Thread;