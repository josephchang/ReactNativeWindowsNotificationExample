import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function Message(props) {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
}

Message.propTypes = {
  id: PropTypes.number.isRequired,
  threadId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

export default Message;