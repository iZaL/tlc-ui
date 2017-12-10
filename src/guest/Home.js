import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text
          style={{textAlign: 'center', fontSize: 40}}
          onPress={() => this.props.navigation.navigate('Settings')}>
          Home
        </Text>
      </View>
    );
  }
}
