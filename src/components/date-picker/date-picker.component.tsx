import React, {PureComponent, ReactElement} from 'react';
import {
  StyleSheet,
  Platform,
  Modal,
  View,
  ViewStyle,
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
} from 'react-native';
import DateTimePicker, {
  Event,
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import {Touchable} from '../touchable';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  controls?: ReactElement;
  onClose: () => void;
  onDateChanged: (date: Date) => void;
  show: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & (IOSNativeProps | AndroidNativeProps);

type State = {
  currentDate: Date;
};

export default class DatePicker extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {currentDate: props.value};
  }

  dateChanged = (_: Event, date?: Date) => {
    const {onClose, onDateChanged} = this.props;
    if (Platform.OS === 'ios' && date) {
      this.setState({currentDate: date});
      return;
    } else if (date) {
      onDateChanged(date);
    }
    onClose();
  };

  renderPicker = () => {
    const {currentDate} = this.state;
    return (
      <DateTimePicker
        {...this.props}
        onChange={this.dateChanged}
        value={currentDate}
      />
    );
  };

  close = () => {
    const {onClose, onDateChanged} = this.props;
    const {currentDate} = this.state;
    onDateChanged(currentDate);
    onClose();
  };

  renderControls = () => {
    const {onClose, textStyle} = this.props;
    return (
      <View style={styles.controls}>
        <Touchable onPress={this.close}>
          <Text style={[styles.buttonText, textStyle]}>Ok</Text>
        </Touchable>
        <Touchable onPress={onClose}>
          <Text style={[styles.buttonText, textStyle]}>Annuleren</Text>
        </Touchable>
      </View>
    );
  };

  render() {
    const {containerStyle, controls, onClose, show, style} = this.props;
    const customControls = !!controls ? controls : this.renderControls();
    return Platform.OS === 'android' ? (
      show ? (
        this.renderPicker()
      ) : null
    ) : (
      <Modal
        animationType="slide"
        onRequestClose={onClose}
        transparent
        visible={show}>
        <SafeAreaView style={[styles.container, containerStyle]}>
          <View style={[styles.pickerContainer, style]}>
            {this.renderPicker()}
            {customControls}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

type Styles = {
  container: ViewStyle;
  buttonText: TextStyle;
  controls: ViewStyle;
  pickerContainer: ViewStyle;
};

const styles: Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  controls: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 16,
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 24,
    width: '80%',
  },
});
