import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import IconFactory from 'components/IconFactory';
import ListItem from "components/ListItem";

export default class LoadAddressInfo extends Component {

  static propTypes = {
    origin: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
  };

  static defaultProps = {
    origin: {country: {}},
    destination: {country: {}},
  };

  // shouldComponentUpdate(nextProps) {
  //   return false;
  // }

  onListItemPress = () => {

  };

  render() {
    let {origin, destination, style} = this.props;

    console.log('origin',origin);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.itemRowContainer}>

          <ListItem
            onItemPress={this.onListItemPress}
            title={origin.address}
            description={`${origin.city},${origin.state},${origin.country.name}`}
          />

        </View>
        <View style={styles.itemRowContainer}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingBottom: 10,
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
