import React, {ReactNode} from 'react';
import {PureComponent} from 'react';
import {
  RippleBackgroundPropType,
  TouchableNativeFeedback,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  useForeground?: boolean;
  children?: ReactNode;
  background?: RippleBackgroundPropType;
  disabled: boolean;
  onPress?: () => void;
}

export default class Touchable extends PureComponent<Props> {
  static defaultProps = {
    containerStyle: {},
    style: {},
    useForeground: true,
    children: [],
    background: TouchableNativeFeedback.Ripple('#000', false),
    onPress: () => {},
  };

  render() {
    const {
      containerStyle,
      style,
      useForeground,
      children,
      background,
      onPress,
      disabled,
    } = this.props;
    return (
      <View style={containerStyle}>
        <TouchableNativeFeedback
          useForeground={useForeground}
          background={background}
          onPress={onPress}
          disabled={disabled}>
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
