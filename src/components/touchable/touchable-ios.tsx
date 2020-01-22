import React, {ReactNode} from 'react';
import {PureComponent} from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';

export type TouchableIOSProps = {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  disabled: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default class TouchableIOS extends PureComponent<TouchableIOSProps> {
  static defaultProps = {
    containerStyle: {},
    style: {},
    children: [],
    onPress: () => {},
  };

  render() {
    const {style, containerStyle, children, onPress, disabled} = this.props;
    return (
      <TouchableOpacity
        style={[containerStyle, style]}
        onPress={onPress}
        disabled={disabled}>
        {children}
      </TouchableOpacity>
    );
  }
}
