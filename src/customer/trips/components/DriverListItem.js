/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text} from 'react-native';
import Divider from 'components/Divider';
import {ListSection} from 'react-native-paper';
import ListItem from 'components/ListItem';

export default class extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    item: [],
  };

  render() {
    let {item} = this.props;
    return <Text>{item.user.name}</Text>;
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
