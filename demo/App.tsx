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
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Card,
  Touchable,
  Divider,
  TextInput,
  PageControl,
  Pager,
  DatePicker,
} from 'react-native-livewall-components';

type Props = {};

type State = {
  textInputText: string;
  pages: ReactNode[];
  currentPage: number;
  buttonDisabled: boolean;
  showPicker: boolean;
  date: Date;
};

const windowWidth = Dimensions.get('window').width;
export default class App extends Component<Props, State> {
  pagerRef: RefObject<Pager>;

  constructor(props: Props) {
    super(props);
    let pagerPages = [];
    for (var idx = 0; idx < 5; idx++) {
      pagerPages.push(this.renderPage(idx + 1));
    }
    this.pagerRef = React.createRef();
    this.state = {
      textInputText: '',
      pages: pagerPages,
      currentPage: 0,
      buttonDisabled: false,
      showPicker: false,
      date: new Date(),
    };
  }

  renderPage = (index: number): ReactNode => (
    <View
      key={index.toString()}
      style={{
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
        width: windowWidth - 48 - 32,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 16,
        }}>{`I am page number ${index}`}</Text>
    </View>
  );

  render() {
    const {
      textInputText,
      pages,
      currentPage,
      buttonDisabled,
      showPicker,
      date,
    } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            bounces={false}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{flexGrow: 1}}
            style={styles.scrollView}>
            <View style={styles.body}>
              <Divider style={styles.divider} />

              <Card>
                <Text>Some content in a card with default shadow</Text>
              </Card>

              <Divider style={styles.divider} />

              <Card>
                <Text>{textInputText}</Text>
                <TextInput
                  placeholder="test"
                  value={textInputText}
                  onChangeText={text => this.setState({textInputText: text})}
                />
                <TextInput
                  placeholder="test"
                  value={textInputText}
                  valid={textInputText === 'Test'}
                  errorStyle={{borderBottomColor: 'red', borderBottomWidth: 1}}
                  errorComponent={<Text>The specified text is not valid!</Text>}
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

              <Divider style={styles.divider} />

              <Pager
                ref={this.pagerRef}
                pageWidth={windowWidth - 32}
                containerStyle={{
                  backgroundColor: 'red',
                  height: 500,
                }}
                onPageChanged={page => this.setState({currentPage: page})}>
                {pages}
              </Pager>
              <PageControl
                style={{height: 50}}
                pages={pages.length}
                currentPage={currentPage}
              />

              <Card
                style={{
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                }}>
                <Touchable
                  onPress={() => this.pagerRef.current?.changePage(-1)}>
                  <Text>Previous Page</Text>
                </Touchable>
                <Divider orientation="vertical" />
                <Touchable onPress={() => this.pagerRef.current?.changePage(1)}>
                  <Text>Next Page</Text>
                </Touchable>
              </Card>

              <Divider style={styles.divider} />

              <Touchable
                disabled={buttonDisabled}
                style={{
                  height: 40,
                  backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabledStyle={{backgroundColor: 'red'}}
                disabledContainerStyle={{borderColor: 'green'}}
                containerStyle={{borderWidth: 2, borderColor: 'red'}}
                onPress={() =>
                  this.setState({buttonDisabled: !buttonDisabled})
                }>
                <Text>{buttonDisabled ? 'Disabled' : 'Enabled'}</Text>
              </Touchable>

              <Touchable onPress={() => this.setState({showPicker: true})}>
                <Text>Choose a date!</Text>
                <Text>{`Selected date: ${date.toISOString()}`}</Text>
              </Touchable>
              <DatePicker
                value={date}
                key={date?.toISOString()}
                mode="date"
                onClose={() => this.setState({showPicker: false})}
                onDateChanged={date => this.setState({date})}
                show={showPicker}
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
  body: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#EEEEEE',
  },
  divider: {
    marginVertical: 16,
  },
});
