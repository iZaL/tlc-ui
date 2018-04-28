/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
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
    let {item,onItemPress} = this.props;
    return <ListItem onItemPress={() => onItemPress(item)} title={item.user.name} />
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
