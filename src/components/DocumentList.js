/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DocumentCard from 'components/DocumentCard';
import {FlatList, StyleSheet} from 'react-native';
import Separator from 'components/Separator';

export default class DocumentList extends Component {
  shouldComponentUpdate() {
    return false;
  }

  renderItem = ({item}) => {
    console.log('item', item);
    const {onEditPress, onDeletePress} = this.props;
    return (
      <DocumentCard
        item={item}
        onEditPress={onEditPress}
        onDeletePress={onDeletePress}
      />
    );
  };

  render() {
    let {items} = this.props;
    console.log('items', items);

    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Separator style={{marginVertical: 10}} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
