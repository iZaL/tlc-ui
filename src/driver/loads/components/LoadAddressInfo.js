import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Linking} from 'react-native';
import ListItem from "components/ListItem";
import {Title} from "react-native-paper";
import I18n from 'utils/locale';
import Divider from "components/Divider";
import GoogleMapDirection from "../../../components/GoogleMapDirection";

export default class LoadAddressInfo extends Component {

  static propTypes = {
    origin: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
  };

  static defaultProps = {
    origin: {country: {}},
    destination: {country: {}},
  };

  shouldComponentUpdate(nextProps) {
    return false;
  }

  onListItemPress = () => {

  };

  openInMaps = (address:object) => {
    let {latitude, longitude} = address;

    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  };

  render() {
    let {origin, destination} = this.props;

    return (
      <View style={[styles.container]}>
        <Title style={{paddingHorizontal:15}}>{I18n.t('pick_up')}</Title>

        <GoogleMapDirection address={origin}>
          <ListItem
            title={origin.address}
            description={`${origin.city},${origin.state},${origin.country.name}`}
          />
        </GoogleMapDirection>

        <Divider/>

        <Title style={{paddingHorizontal:15}}>{I18n.t('drop_off')}</Title>

        <GoogleMapDirection address={destination}>
          <ListItem
            title={destination.address}
            description={`${destination.city},${destination.state},${destination.country.name}`}
          />
        </GoogleMapDirection>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
