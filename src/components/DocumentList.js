/**
 * @flow
 */
import React, {Component} from 'react';
import DocumentCard from 'components/DocumentCard';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';

export default class DocumentList extends Component {
  shouldComponentUpdate() {
    return false;
  }

  renderItem = ({item}) => {
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

    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 10}} />}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
