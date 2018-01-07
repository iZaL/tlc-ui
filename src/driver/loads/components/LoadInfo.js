/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export default class LoadInfo extends PureComponent {
  static propTypes = {
    load: PropTypes.object.isRequired,
    // onItemPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    load:{
      trailer:{}
    }
  };

  render() {
    let {load} = this.props;
    console.log('l',load);
    return (
      <View style={styles.container}>
        <View style={[styles.itemRowContainer]}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{I18n.t('trailer')}</Text>
            <Text style={styles.trailerName}>{load.trailer.name}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{I18n.t('packaging')}</Text>
            <Text style={styles.packageName}>Palette</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{I18n.t('weight')}</Text>
            <Text style={styles.weight}>48,000 lbs</Text>
          </View>
        </View>

        <View style={[styles.itemRowContainer, styles.rowVerticalPadding]}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{I18n.t('pick_up')}</Text>
            <Text style={styles.value}>Jan 4</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{I18n.t('distance')}</Text>
            <Text style={styles.value}>350 KM</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{I18n.t('price')}</Text>
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
