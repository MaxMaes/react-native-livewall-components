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
    const pages = React.Children.count(props.children);
    this.state = {currentPage: 0, numberOfPages: pages};
  }

  updatePage = (page: number) => {
    const {onPageChanged} = this.props;
    const {numberOfPages} = this.state;
    //Protect from under- and overflow.
    if (page < 0 || page >= numberOfPages) {
      return;
    }
    this.setState({currentPage: page});
    if (onPageChanged) {
      onPageChanged(page);
    }
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {currentPage} = this.state;
    const {layoutMeasurement, contentOffset} = event.nativeEvent;
    //Calculate the page using the x offset and the page width.
    const page = Math.round(contentOffset.x / layoutMeasurement.width);
    if (page !== currentPage) {
      this.updatePage(page);
    }
  };

  setPage = (page: number) => {
    const {pageWidth} = this.props;
    const {numberOfPages} = this.state;
    const lastPage = numberOfPages - 1;
    if (page >= 0 && page <= lastPage && this.scrollViewRef.current) {
      //TODO: Check fullscreen usage when pager is inset with margin/padding.
      const pageSize = pageWidth ? pageWidth : Dimensions.get('window').width;
      //Calculate the new x position based on the page size and new page.
      const x = page > 0 ? pageSize * page : 0;
      this.scrollViewRef.current.scrollTo({x, y: 0});
    }
  };

  changePage = (change: number) => {
    const {currentPage} = this.state;
    this.setPage(currentPage + change);
  };

  /**
   * @deprecated Move to the changePage or setPage method(s) to change pages.
   */
  nextPage = () => {
    console.warn(
      'This method is deprecated, please use the changePage or setPage method(s) to change pages.'
    );
    this.changePage(1);
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
