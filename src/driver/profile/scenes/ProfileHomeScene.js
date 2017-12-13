//@flow
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

export default class ProfileHomeScene extends Component {
  static propTypes = {

  };

  render() {

    return (
      <ScrollView style={styles.container}>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
  },

});
