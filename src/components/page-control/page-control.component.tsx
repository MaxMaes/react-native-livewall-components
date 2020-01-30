import React from "react";
import { View, ViewStyle, StyleSheet, StyleProp } from "react-native";
import { PureComponent } from "react";

type Props = {
  currentPage: number;
  pages: number;
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
};

export class PageControl extends PureComponent<Props> {
  renderDot = (index: number, current: boolean) => {
    const { dotStyle, activeDotStyle } = this.props;
    const style = current
      ? [styles.dot, styles.active, activeDotStyle]
      : [styles.dot, dotStyle];
    return <View style={style} key={index.toString()} />;
  };

  render() {
    const { style = {}, pages, currentPage } = this.props;
    let pageDots = [];
    for (let idx = 0; idx < pages; idx++) {
      pageDots.push(this.renderDot(idx, currentPage === idx));
    }
    return <View style={[styles.container, style]}>{pageDots}</View>;
  }
}

export default PageControl;

type Style = {
  container: ViewStyle;
  active: ViewStyle;
  dot: ViewStyle;
};

const styles: Style = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#FFF"
  },
  dot: {
    borderColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    height: 8,
    marginHorizontal: 4,
    width: 8
  }
});
