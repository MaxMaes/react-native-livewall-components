import React, {ReactNode} from 'react';
import {PureComponent} from 'react';
import {
  RippleBackgroundPropType,
  TouchableNativeFeedback,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

export type TouchableAndroidProps = {
  /** ANDROID ONLY */
  background?: RippleBackgroundPropType;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledContainerStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** ANDROID ONLY */
  useForeground?: boolean;
};

export default class TouchableAndroid extends PureComponent<
  TouchableAndroidProps
> {
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
      disabledContainerStyle,
      disabledStyle,
    } = this.props;
    const container = disabled
      ? [containerStyle, disabledContainerStyle]
      : containerStyle;
    const innerStyle = disabled ? [style, disabledStyle] : style;
    return (
      <View style={container}>
        <TouchableNativeFeedback
          useForeground={useForeground}
          background={background}
          onPress={onPress}
          disabled={disabled}>
          <View style={innerStyle}>{children}</View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
