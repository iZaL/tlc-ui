/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Separator from "../../../components/Separator";
import colors from "assets/theme/colors";

export default class TransitTab extends PureComponent {
  static propTypes = {
    activeCountryID: PropTypes.number.isRequired,
    onItemPress: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
  };

  renderRow = (item) => {
    let {activeCountryID, onItemPress} = this.props;
    return (
      <Touchable key={item.id} onPress={() => onItemPress(item)}>
        <View>
          <View style={[
            styles.itemContainer,
            activeCountryID === item.id && styles.itemContainerActive
          ]}>
            <Text style={[styles.title,
              activeCountryID === item.id && styles.titleActive
            ]}>{item.name}</Text>
          </View>
          <Separator/>
        </View>
      </Touchable>
    )
  };

  render() {
    let {items} = this.props;
    return (
      <View style={styles.container}>
        {
          items.map(item => this.renderRow(item))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  itemContainerActive: {
    backgroundColor: colors.primary
  },
  title:{
    textAlign: 'left',
    fontSize: 18,
  },
  titleActive:{
    color:'white'
  }
});
