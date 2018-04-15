/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';
import {ListSection} from 'react-native-paper';
import ListItem from 'components/ListItem';

export default class DriversList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  renderRow = ({item}) => {
    let {onItemPress} = this.props;

    return <ListItem onItemPress={() => onItemPress(item)} title={item.user.name}/>;
  };

  render() {
    let {items} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider/>}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
