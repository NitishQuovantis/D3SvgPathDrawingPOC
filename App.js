import React, {Component} from 'react';
import {View, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import Screen from './src/Screen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {width, height} = Dimensions.get('screen');
    return (
      <View style={{flex: 1, backgroundColor: '#30303030'}}>
        <ScrollView>
          <SafeAreaView />
          <Screen width={width} height={height} />
        </ScrollView>
      </View>
    );
  }
}
