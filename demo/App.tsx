/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, ReactNode, RefObject} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Card,
  Touchable,
  Divider,
  TextInput,
  PageControl,
  Pager,
} from 'react-native-livewall-components';

type Props = {};

type State = {
  textInputText: string;
  pages: ReactNode[];
  currentPage: number;
};

export default class App extends Component<Props, State> {
  pagerRef: RefObject<Pager>;

  constructor(props: Props) {
    super(props);
    let pagerPages = [];
    for (var idx = 0; idx < 5; idx++) {
      pagerPages.push(this.renderPage(idx + 1));
    }
    this.pagerRef = React.createRef();
    this.state = {textInputText: '', pages: pagerPages, currentPage: 0};
  }

  renderPage = (index: number): ReactNode => (
    <View
      key={index.toString()}
      style={{
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
      }}>
      <Text>{`I am page number ${index}`}</Text>
    </View>
  );

  render() {
    const {textInputText, pages, currentPage} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{flex: 1}}
            style={styles.scrollView}>
            <View style={styles.body}>
              <Card>
                <Touchable onPress={() => this.pagerRef.current.nextPage()}>
                  <Text>Next Page Touchable component</Text>
                </Touchable>
              </Card>

              <Divider style={{marginTop: 16, marginBottom: 16}} />

              <Card>
                <Text>Some content in a card with default shadow</Text>
              </Card>

              <Divider style={{marginTop: 16, marginBottom: 16}} />

              <Card style={{height: 100, alignItems: 'center'}}>
                <Divider orientation="vertical" />
              </Card>

              <Divider style={{marginTop: 16, marginBottom: 16}} />

              <Card>
                <Text>{this.state.textInputText}</Text>
                <TextInput
                  placeholder="test"
                  value={textInputText}
                  onChangeText={text => this.setState({textInputText: text})}
                />
                <TextInput
                  placeholder="test"
                  value={textInputText}
                  placeholderTextColor="pink"
                  activePlaceholderTextColor="red"
                  onChangeText={text => this.setState({textInputText: text})}
                />
                <TextInput
                  placeholder="test"
                  value={textInputText}
                  placeholderTextColor="pink"
                  activePlaceholderTextColor="red"
                  onChangeText={text => this.setState({textInputText: text})}
                  onFocus={() => this.setState({textInputText: 'focussed'})}
                  onBlur={() => this.setState({textInputText: 'blurred me'})}
                />
              </Card>

              <Divider style={{marginTop: 16, marginBottom: 16}} />

              <Pager
                ref={this.pagerRef}
                pageWidth={300}
                onPageChanged={page => this.setState({currentPage: page})}>
                {pages}
              </Pager>
              <PageControl
                style={{height: 50}}
                pages={pages.length}
                currentPage={currentPage}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#EEEEEE',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
