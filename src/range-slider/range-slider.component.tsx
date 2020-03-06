import React, {
  PureComponent,
  RefObject,
  ReactElement,
  cloneElement,
} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  StyleProp,
} from 'react-native';

type Props = {
  activeTrackStyle?: StyleProp<ViewStyle>;
  marker?: ReactElement;
  max?: number;
  maxValue?: number;
  min?: number;
  minValue?: number;
  step?: number;
  style?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  valueChanged: (minValue: number, maxValue: number) => void;
};

type State = {
  maxPosition: number;
  minPosition: number;
};

export default class RangeSlider extends PureComponent<Props, State> {
  static defaultProps = {
    maxValue: 10,
    minValue: 0,
    valueChanged: () => null,
  };

  container: RefObject<View> = React.createRef();
  currentMarker: string;
  initialPosition: number;
  markerWidth: number;
  maxX: number;
  minX: number;
  absoluteLeft: number;
  panResponder: PanResponderInstance;
  trackWidth: number;

  constructor(props: Props) {
    super(props);
    this.initialPosition = 0;
    this.currentMarker = 'min';
    this.minX = 0;
    this.maxX = 0;
    this.absoluteLeft = 0;
    this.markerWidth = 0;
    this.trackWidth = 0;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.allow,
      onStartShouldSetPanResponderCapture: this.allow,
      onMoveShouldSetPanResponder: this.allow,
      onMoveShouldSetPanResponderCapture: this.allow,
      onPanResponderGrant: this.touchesStarted,
      onPanResponderMove: this.touchesMoved,
      onPanResponderTerminationRequest: this.allow,
      onPanResponderRelease: this.panningStopped,
      onPanResponderTerminate: this.panningStopped,
      onShouldBlockNativeResponder: this.allow,
    });
    this.state = {
      minPosition: 0,
      maxPosition: 0,
    };
  }

  allow = () => {
    return true;
  };

  touchesStarted = async (event: GestureResponderEvent) => {
    const {maxPosition, minPosition} = this.state;
    const {pageX} = event.nativeEvent;
    const relativePosition = pageX - this.absoluteLeft;
    //Subtract marker positions from the absolute position.
    const leftOffset = Math.abs(relativePosition - minPosition);
    const rightOffset = Math.abs(relativePosition - maxPosition);
    //Set the initial position to the position of the marker with the smallest offset.
    this.initialPosition = leftOffset < rightOffset ? minPosition : maxPosition;
    this.currentMarker = leftOffset < rightOffset ? 'min' : 'max';
  };

  updatePosition = (newPosition: number) => {
    const {maxPosition, minPosition} = this.state;
    const position = this.positionWithinBounds(newPosition);
    //Ensure the markers can't overlap.
    if (
      this.currentMarker === 'min' &&
      position <= maxPosition - this.markerWidth
    ) {
      this.setState({minPosition: position});
    } else if (
      this.currentMarker === 'max' &&
      position >= minPosition + this.markerWidth
    ) {
      this.setState({maxPosition: position});
    }
  };

  touchesMoved = (
    _: GestureResponderEvent,
    state: PanResponderGestureState
  ) => {
    const newPosition = this.initialPosition + state.dx;
    this.updatePosition(newPosition);
  };

  panningStopped = () => {
    const {valueChanged} = this.props;
    const {maxPosition, minPosition} = this.state;
    valueChanged(
      this.positionToValue(minPosition),
      this.positionToValue(maxPosition)
    );
  };

  setMarkersForProps = () => {
    const {max, maxValue, min, minValue} = this.props;
    //MinX is the start x, maxX is x plus width minus the marker size.
    this.maxX = this.trackWidth - this.markerWidth;
    const minimum = min || minValue!;
    const maximum = max || maxValue!;
    const minPosition = this.valueToPosition(minimum);
    const maxPosition = this.valueToPosition(maximum);
    this.setState({minPosition, maxPosition});
  };

  updateBounds = async (event: LayoutChangeEvent) => {
    const {width, x} = event.nativeEvent.layout;
    this.absoluteLeft = x;
    this.trackWidth = width;
    this.setMarkersForProps();
  };

  updateMarkerBounds = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    if (Math.round(width) !== this.markerWidth) {
      this.markerWidth = width;
      this.setMarkersForProps();
    }
  };

  positionWithinBounds = (position: number) => {
    let returnPosition = position;
    //Don't allow markers to go outside of the view bounds.
    if (position < this.minX) {
      returnPosition = this.minX;
    }
    if (position > this.maxX) {
      returnPosition = this.maxX;
    }
    return Math.floor(returnPosition);
  };

  //Note: This method uses position within bounds internally.
  valueToPosition = (value: number) => {
    const {minValue, maxValue} = this.props;
    const totalValues = maxValue! - minValue!;
    const targetValue = value - minValue!;
    const position =
      targetValue > 0 ? (this.maxX / totalValues) * targetValue : 0;
    return this.positionWithinBounds(position);
  };

  positionToValue = (position: number) => {
    const {minValue, maxValue, step} = this.props;
    const totalValues = maxValue! - minValue!;
    const value = position > 0 ? position / (this.maxX / totalValues) : 0;
    //If there is a step, round the number to the nearest step. https://stackoverflow.com/a/51079461
    const stepRoundedValue = step ? Math.ceil(value / step) * step : value;
    return stepRoundedValue + minValue!;
  };

  render() {
    const {maxPosition, minPosition} = this.state;
    const {activeTrackStyle, marker, style, trackStyle} = this.props;
    const leftMarkerStyle: ViewStyle = {
      position: 'absolute',
      left: minPosition,
    };
    const rightMarkerStyle: ViewStyle = {
      position: 'absolute',
      left: maxPosition,
    };
    const activeStyle = {
      left: minPosition + this.markerWidth / 2,
      width: maxPosition - minPosition,
    };
    const markerLeft = !!marker ? marker : <View style={styles.marker} />;
    const markerRight = !!marker ? marker : <View style={styles.marker} />;
    //Clone the markers and add the position styling and on layout method.
    const leftMarker = cloneElement(markerLeft, {
      style: [markerLeft.props.style, leftMarkerStyle],
      onLayout: this.updateMarkerBounds,
    });
    const rightMarker = cloneElement(markerLeft, {
      style: [markerRight.props.style, rightMarkerStyle],
      onLayout: this.updateMarkerBounds,
    });
    return (
      <View
        ref={this.container}
        style={[styles.container, style]}
        onLayout={this.updateBounds}
        {...this.panResponder.panHandlers}>
        <View style={[styles.track, trackStyle]} />
        <View style={[styles.activeTrack, activeStyle, activeTrackStyle]} />
        {leftMarker}
        {rightMarker}
      </View>
    );
  }
}

type Styles = {
  container: ViewStyle;
  activeTrack: ViewStyle;
  marker: ViewStyle;
  track: ViewStyle;
};

const styles: Styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
  },
  activeTrack: {
    backgroundColor: '#F00',
    position: 'absolute',
    height: 2,
  },
  marker: {
    backgroundColor: '#DDD',
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  track: {
    backgroundColor: '#000',
    height: 2,
  },
});
