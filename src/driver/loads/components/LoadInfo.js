/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import {Caption} from "react-native-paper";
import Label from "../../../components/Label";

export default class LoadInfo extends PureComponent {
  static propTypes = {
    load: PropTypes.object.isRequired,
    // onItemPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    load: {
      trailer: {},
    },
  };

  render() {
    let {load, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.itemRowContainer]}>
          <View style={{flex: 1}}>
            <Label title={I18n.t('trailer')}/>
            <Text style={styles.trailerName}>
              {load.trailer_type ? load.trailer_type.name : ''}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Label title={I18n.t('packaging')}/>
            <Text style={styles.packageName}>
              {load.packaging ? load.packaging.name : ''}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Label title={I18n.t('weight')}/>
            <Text style={styles.weight}>48,000 lbs</Text>
          </View>
        </View>

        <View style={[styles.itemRowContainer, styles.rowVerticalPadding]}>
          <View style={{flex: 1}}>
            <Label title={I18n.t('pick_up')}/>
            <Text style={styles.value}>Jan 4 <Caption>(10-11am)</Caption></Text>
          </View>
          <View style={{flex: 1}}>
            <Label title={I18n.t('drop_off')}/>
            <Text style={styles.value}>Jan 7 <Caption>(11-14am)</Caption></Text>
          </View>
          <View style={{flex: 1}}>
            <Label title={I18n.t('price')}/>
            <Text style={styles.value}>3000 kwd</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:5
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
