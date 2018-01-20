import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import LocationListItem from "../../locations/components/LocationListItem";

export default class LoadWhat extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSelect: () => {
    },
  };

  render() {
    console.log('Load Where', this.props);
    let {pickLocation, onPickLocationItemPress} = this.props;
    return (
      <ScrollView style={styles.container}>

          <Text onPress={() => this.props.onPickLocationsListPress()}>
            Select Pickup Location
          </Text>

          <LocationListItem
            item={pickLocation}
            onPress={onPickLocationItemPress}
          />

          <Text onPress={() => this.props.onDropLocationsListPress()}>
            Select Drop Location
          </Text>

          <LocationListItem
            item={pickLocation}
            onPress={onPickLocationItemPress}
          />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
