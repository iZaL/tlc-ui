import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';
import CheckedListItem from 'components/CheckedListItem';

export default class LoadWhat extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    activeIDs: PropTypes.array.isRequired,
  };

  renderRow = ({item}) => {
    let {onValueChange, activeIDs} = this.props;
    return (
      <CheckedListItem
        checked={activeIDs.includes(item.id)}
        title={`${item.name} - ${item.country.name}`}
        onPress={() => onValueChange(item.id)}
      />
    );
  };

  render() {
    let {items, activeIDs} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 5}} />}
        keyExtractor={(item, index) => `${index}`}
        extraData={activeIDs}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
