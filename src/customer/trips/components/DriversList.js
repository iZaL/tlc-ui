/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';
import {ListSection} from 'react-native-paper';
import DriverListItem from "customer/trips/components/DriverListItem";

export default class extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  renderRow = ({item}) => {
    let {onItemPress} = this.props;
    return <DriverListItem onItemPress={onItemPress} item={item} />;
  };

  render() {
    let {items} = this.props;
    return (
      <ListSection>
        <FlatList
          data={items}
          style={styles.listContainer}
          renderItem={this.renderRow}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `${index}`}
        />
      </ListSection>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
