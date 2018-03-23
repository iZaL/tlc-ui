/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import Separator from 'components/Separator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationListItem from 'customer/locations/components/LocationListItem';

export default class LocationList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  renderRow = ({item}) => {
    let {onItemPress} = this.props;
    return <LocationListItem onPress={onItemPress} item={item} />;
  };

  render() {
    let {items} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator style={{marginVertical:10}} />}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 5,
  },
});
