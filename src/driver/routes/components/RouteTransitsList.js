/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';

export default class RouteTransitsList extends PureComponent {
  static propTypes = {
    activeCountryID: PropTypes.number.isRequired,
    onItemPress: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  renderRow = ({item}) => {
    let {activeCountryID, onItemPress} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)}>
        <View
          style={[
            styles.itemContainer,
            activeCountryID === item.id && styles.itemContainerActive,
          ]}>
          <Text
            style={[
              styles.title,
              activeCountryID === item.id && styles.titleActive,
            ]}>
            {item.name}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    let {items} = this.props;
    return (
      <FlatList
        horizontal={true}
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator style={{marginVertical:10}} />}
        keyExtractor={(item, index) => {`${item.id}`}}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    alignItems: 'center',
    padding: 15,
    paddingBottom: 10,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
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
