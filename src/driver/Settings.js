import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Settings extends Component {
  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text style={{textAlign: 'center', fontSize: 40}}>Settings</Text>
      </View>
    );
  }
}
