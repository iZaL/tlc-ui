/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';
import {ListSection} from 'react-native-paper';
import ListItem from 'components/ListItem';

export default class BankAccountList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  renderRow = ({item}) => {
    let {onItemPress, description} = this.props;
    return (
      <ListItem
        onPress={() => onItemPress(item)}
        title={`${item.name} ${item.account_number}`}
        description={`${item.iban} ${item.address} `}
      />
    );
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
