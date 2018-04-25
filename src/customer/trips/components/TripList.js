/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import {ListSection, TouchableRipple} from 'react-native-paper';
import TripListItem from "customer/trips/components/TripListItem";

export default class extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  renderRow = ({item}) => {
    let {onItemPress} = this.props;
    return (
        <TripListItem item={item} onItemPress={onItemPress}/>
    );
  };

  render() {
    let {items} = this.props;
    console.log('trips', items);
    return (
      <ListSection>
        <FlatList
          data={items}
          style={styles.listContainer}
          renderItem={this.renderRow}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider/>}
          keyExtractor={(item, index) => `${index}`}
        />
      </ListSection>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
