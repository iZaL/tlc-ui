/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFactory from '../../../components/IconFactory';

export default class LoadPickDropLocation extends PureComponent {
  static propTypes = {
    origin: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
  };

  static defaultProps = {
    origin: {country: {}},
    destination: {country: {}},
  };

  render() {
    let {origin, destination, style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.itemRowContainer}>
          <IconFactory
            type="MaterialCommunityIcons"
            name="arrow-up-box"
            size={30}
          />
          <Text style={styles.locationName}>
            {origin.city}, {origin.country.name}
          </Text>
        </View>
        <View style={styles.itemRowContainer}>
          <IconFactory
            type="MaterialCommunityIcons"
            name="arrow-down-box"
            size={30}
          />
          <Text style={styles.locationName}>
            {destination.city}, {destination.country.name}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
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
