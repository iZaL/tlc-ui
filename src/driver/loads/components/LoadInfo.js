/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'assets/theme/colors';

export default class LoadInfo extends PureComponent {
  static propTypes = {
    // items: PropTypes.array.isRequired,
    // onItemPress: PropTypes.func.isRequired
  };

  render() {
    // let {items} = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.itemRowContainer]}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Trailer</Text>
            <Text style={styles.trailerName}>Flatbed</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Packaging</Text>
            <Text style={styles.packageName}>Palette</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.weight}>48,000 lbs</Text>
          </View>
        </View>

        <View style={[styles.itemRowContainer, styles.rowVerticalPadding]}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Pick up</Text>
            <Text style={styles.value}>Jan 4</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>350 KM</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>3000 kwd</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
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
  infoText: {
    fontSize: 16,
  },
  trailerName: {
    fontSize: 16,
    paddingRight: 50,
  },
  packageName: {
    fontSize: 16,
    paddingRight: 50,
  },
  weight: {
    fontSize: 16,
  },
  rowVerticalPadding: {
    paddingVertical: 5,
  },
  label: {
    color: colors.mediumGrey,
  },
  value: {
    fontSize: 16,
  },
});
