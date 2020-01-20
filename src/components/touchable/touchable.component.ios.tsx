import React, {ReactNode} from 'react';
import {PureComponent} from 'react';
import {
  RippleBackgroundPropType,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  useForeground?: boolean;
  children?: ReactNode;
  background?: RippleBackgroundPropType;
  disabled: boolean;
  onPress?: () => void;
};

export default class Touchable extends PureComponent<Props> {
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
