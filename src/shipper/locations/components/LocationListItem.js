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

export default class LocationListItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    let {item, onPress} = this.props;
    return (
      <Touchable onPress={() => onPress(item)}>
        <View style={[styles.contentContainer]}>
            <Text style={styles.email}>{item.address}</Text>

            <View style={{paddingVertical:5}}>
              <Text style={styles.email}>{item.city}</Text>
              <Text style={styles.email}>{item.state}</Text>
              <Text style={styles.email}>{item.country.name}</Text>
            </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1,
    marginBottom: 10,
    padding: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
  },
  headerIcon: {},
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.mediumGrey,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
  },
  itemContainer: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 18,
    color: colors.darkGrey,
  },
  email: {
    paddingHorizontal: 10,
    fontSize: 18,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
