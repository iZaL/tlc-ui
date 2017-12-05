import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Profile extends Component {
  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text style={{textAlign: 'center', fontSize: 40}}>Profile</Text>
      </View>
    );
  }
}
