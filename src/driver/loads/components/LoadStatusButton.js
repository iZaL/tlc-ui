/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import {Caption} from 'react-native-paper';
import Label from 'components/Label';

export default class LoadStatusButton extends PureComponent {
  static propTypes = {
    load: PropTypes.object.isRequired,
    showDetail: PropTypes.bool,
    // onItemPress: PropTypes.func.isRequired
  };

  static defaultProps = {};

  render() {
    let {} = this.props;
    return <View style={styles.col} />;
  }
}

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
  },
  col: {
    flex: 1,
  },
});
