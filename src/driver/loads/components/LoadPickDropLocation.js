/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LoadsList extends PureComponent {
  static propTypes = {
    // items: PropTypes.array.isRequired,
    // onItemPress: PropTypes.func.isRequired
  };

  render() {
    // let {items} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.itemRowContainer}>
          <MaterialCommunityIcons
            name="arrow-up-box"
            size={30}
            style={styles.locationIcon}
          />
          <Text style={styles.locationName}>Jahra, Kuwait</Text>
        </View>
        <View style={styles.itemRowContainer}>
          <MaterialCommunityIcons
            name="arrow-down-box"
            size={30}
            style={styles.locationIcon}
          />
          <Text style={styles.locationName}>Jeddah, Saudi Arabia</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    textAlign: 'left',
    fontSize: 18,
    paddingHorizontal: 5,
    fontWeight: '500',
  },
  locationIcon: {
    height: 30,
  },
});
