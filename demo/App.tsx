/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Alert,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card, Touchable, Divider} from 'react-native-livewall-components';

export default class App extends Component {
  render() {
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
                <Touchable onPress={() => Alert.alert('Press!')}>
                  <Text>TOUCHABLE COMPONENT</Text>
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
