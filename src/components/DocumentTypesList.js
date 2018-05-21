/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DocumentTypeCard from 'components/DocumentTypeCard';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';

export default class DocumentTypesList extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    return (
      <DocumentTypeCard
        item={item}
        onPress={onItemPress}
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
