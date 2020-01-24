import React, {PureComponent} from 'react';
import {
  StyleSheet,
  ScrollView,
  ViewStyle,
  StyleProp,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import {ReactNode, RefObject} from 'react';

interface Props extends ScrollViewProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  pageWidth?: number;
  style?: StyleProp<ViewStyle>;
  onPageChanged?: (page: number) => void;
}

type State = {
  currentPage: number;
  numberOfPages: number;
};

export class Pager extends PureComponent<Props, State> {
  scrollViewRef: RefObject<ScrollView>;

  constructor(props: Props) {
    super(props);
    this.scrollViewRef = React.createRef();
    const pages = React.Children.count.length;
    this.state = {currentPage: 0, numberOfPages: pages};
  }

  updatePage = (page: number) => {
    const {onPageChanged} = this.props;
    this.setState({currentPage: page});
    if (onPageChanged) {
      onPageChanged(page);
    }
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {currentPage} = this.state;
    const {layoutMeasurement, contentOffset} = event.nativeEvent;
    //Calculate the page using the x offset and the page width.
    const page = Math.ceil(contentOffset.x / layoutMeasurement.width);
    if (page !== currentPage) {
      this.updatePage(page);
    }
  };

  nextPage = () => {
    const {pageWidth} = this.props;
    const {currentPage, numberOfPages} = this.state;
    const lastPage = numberOfPages - 1;
    if (currentPage <= lastPage && this.scrollViewRef.current) {
      //TODO: Check fullscreen usage when pager is inset with margin/padding.
      const pageSize = pageWidth ? pageWidth : Dimensions.get('window').width;
      const nextPage = currentPage + 1;
      //Calculate the new x position based on the page size and new page.
      const x =
        currentPage > 0 ? (pageSize / currentPage) * nextPage : pageSize;
      this.scrollViewRef.current.scrollTo({x, y: 0});
      this.updatePage(nextPage);
    }
  };

  render() {
    const {children, containerStyle, pageWidth, style} = this.props;
    const snapInterval = pageWidth ? pageWidth : undefined;
    const pagingEnabled = !!!pageWidth;
    return (
      <ScrollView
        ref={this.scrollViewRef}
        horizontal
        bounces={false}
        decelerationRate={0.9}
        scrollEventThrottle={64}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, containerStyle]}
        snapToInterval={snapInterval}
        pagingEnabled={pagingEnabled}
        snapToAlignment="start"
        style={[styles.pager, style]}
        onScroll={this.onScroll}
        {...this.props}>
        {children}
      </ScrollView>
    );
  }
}

export default Pager;

type Styles = {
  container: {};
  pager: {};
};

const styles: Styles = StyleSheet.create({
  container: {},
  pager: {},
});
