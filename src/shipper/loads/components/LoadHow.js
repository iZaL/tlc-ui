import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class LoadWhat extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSelect: () => {},
  };

  render() {
    console.log('Load How');
    return (
      <ScrollView>
        <Text>Load How</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
