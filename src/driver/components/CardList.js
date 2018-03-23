/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';

export default class CardList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  renderRow = ({item}) => {
    return (
      <View style={[styles.itemContainer]}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };

  render() {
    let {items} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Separator style={{marginVertical: 10}} />
        )}
        keyExtractor={(item, index) => {
          `${item.id}`;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1,
  },
  itemContainerActive: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
  },
  titleActive: {},
});
