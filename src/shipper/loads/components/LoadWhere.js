import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import LocationListItem from 'shipper/locations/components/LocationListItem';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';

export default class LoadWhat extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSelect: () => {},
  };

  render() {
    console.log('Load Where', this.props);
    let {pickLocation, onPickLocationItemPress} = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text
          onPress={() => this.props.onPickLocationsListPress()}
          style={styles.label}>
          Select Pickup Location
        </Text>

        <LocationListItem
          item={pickLocation}
          onPress={onPickLocationItemPress}
        />

        <Separator
          style={{backgroundColor: colors.mediumGrey, marginVertical: 20}}
        />

        <Text
          onPress={() => this.props.onDropLocationsListPress()}
          style={styles.label}>
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
    flex: 1,
  },
  label: {
    paddingBottom: 10,
    fontSize: 20,
    color: colors.primary,
  },
});
