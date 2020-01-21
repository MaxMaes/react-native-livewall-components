import React, {Component} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

type Props = {
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
};

export class Divider extends Component<Props> {
  render() {
    const {orientation = 'horizontal', style} = this.props;
    const orientationStyle =
      orientation === 'horizontal'
        ? styles.dividerHorizontal
        : styles.dividerVertical;
    return <View style={[orientationStyle, style]} />;
  }
}

export default Divider;

const styles = StyleSheet.create({
  dividerHorizontal: {
    height: 1,
    width: '100%',
    backgroundColor: "#E1E1E1",
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: "#E1E1E1",
  },
});
