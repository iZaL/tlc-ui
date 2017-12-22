/**
 * @flow
 */
import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, Picker, StyleSheet, Text, View, Modal} from 'react-native';
import I18n from 'utils/locale';

export default class AddRoute extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  render() {
    let {items, onClose, onItemPress} = this.props;
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.fadedWhite,
    // paddingHorizontal: 10,
    // paddingTop: 30,
  },
});
