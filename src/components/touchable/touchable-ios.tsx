import React, {ReactNode} from 'react';
import {PureComponent} from 'react';
import {TouchableOpacity, ViewStyle, StyleProp} from 'react-native';

export type TouchableIOSProps = {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledContainerStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
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
    const {
      style,
      containerStyle,
      children,
      onPress,
      disabled,
      disabledContainerStyle,
      disabledStyle,
    } = this.props;
    const styling = disabled
      ? [containerStyle, style, disabledContainerStyle, disabledStyle]
      : [containerStyle, style];
    return (
      <TouchableOpacity style={styling} onPress={onPress} disabled={disabled}>
        {children}
      </TouchableOpacity>
    );
  }
}
