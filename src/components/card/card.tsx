import React, {Component} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export class Card extends Component<Props> {
  render() {
    const {children, style} = this.props;
    return <View style={[styles.card, style]}>{children}</View>;
  }
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    shadowColor: '#212529',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.49,
    elevation: 6,
  },
});
