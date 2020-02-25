import React, {Component} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, ViewProps} from 'react-native';

type Props =  {
  style?: StyleProp<ViewStyle>;
} & ViewProps

export class Card extends Component<Props> {
  render() {
    const {children, style} = this.props;
    const propsToPass: ViewProps = {...this.props};
    delete propsToPass.style;

    return <View style={[styles.card, style]} {...propsToPass}>{children}</View>;
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
