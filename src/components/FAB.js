import React, {Component} from 'react';
import {View} from 'react-native';
import {FAB as PaperFAB} from 'react-native-paper';

export default class FAB extends Component {

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    inset: false,
  };

  render() {

    return (
      <View style={{alignItems:'flex-end',right:30}}>
        <PaperFAB {...this.props}/>
      </View>
    );
  }
}
