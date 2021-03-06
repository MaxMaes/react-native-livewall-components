import React, {Component, ReactNode} from 'react';
import {
  Image,
  View,
  TextInputProps,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
  TextInput as RNTextInput,
  TextStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';

interface Props extends TextInputProps {
  activeContainerStyle?: StyleProp<ViewStyle>;
  activeStyle?: StyleProp<TextStyle>;
  activeIconStyle?: StyleProp<ImageStyle>;
  activePlaceholderTextColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  errorComponent?: ReactNode;
  errorStyle?: StyleProp<ViewStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  valid?: boolean;
}

export class TextInput extends Component<Props> {
  state = {
    active: false,
  };

  textField = React.createRef<RNTextInput>();

  focus = () => {
    this.textField.current?.focus();
  };

  render() {
    const {
      activeContainerStyle,
      activeIconStyle,
      activeStyle,
      activePlaceholderTextColor,
      containerStyle,
      errorComponent,
      errorStyle,
      icon,
      iconStyle,
      placeholderTextColor,
      style,
      onFocus = () => {},
      onBlur = () => {},
      valid = true,
    } = this.props;
    const {active} = this.state;

    const propsToPass: TextInputProps = {...this.props};
    delete propsToPass.placeholderTextColor;
    delete propsToPass.style;
    delete propsToPass.onFocus;
    delete propsToPass.onBlur;

    return (
      <View>
        <View
          style={[
            styles.containerStyle,
            containerStyle,
            active ? activeContainerStyle : undefined,
          ]}>
          {icon && (
            <Image
              source={icon}
              style={[
                styles.icon,
                iconStyle,
                active ? activeIconStyle : undefined,
              ]}
            />
          )}
          <RNTextInput
            ref={this.textField}
            style={[
              styles.inputStyle,
              style,
              active ? activeStyle : undefined,
              valid ? undefined : errorStyle,
            ]}
            placeholderTextColor={
              active
                ? activePlaceholderTextColor
                  ? activePlaceholderTextColor
                  : placeholderTextColor
                : placeholderTextColor
            }
            onFocus={e => {
              this.setState({active: true});
              onFocus(e);
            }}
            onBlur={e => {
              this.setState({active: false});
              onBlur(e);
            }}
            {...propsToPass}
          />
        </View>
        <View>{!valid && errorComponent}</View>
      </View>
    );
  }
}

export default TextInput;

interface Styles {
  containerStyle: ViewStyle;
  icon: ImageStyle;
  inputStyle: TextStyle;
}

const styles: Styles = StyleSheet.create({
  containerStyle: {
    height: 56,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
});
