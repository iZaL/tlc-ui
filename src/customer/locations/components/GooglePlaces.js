/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from 'utils/env.js';
import I18n, {isRTL} from 'utils/locale';
import Qs from 'qs';

export default class GooglePlaces extends Component {
  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
  };

  static defaultProps = {
    address: {
      address: null,
      city: null,
      state: null,
      country: 'KW',
    },
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.address.address !== this.props.address.address;
  }

  async geoCode(locationData, lang) {
    const {updateAddress} = this.props;
    let isNeighbourhood = false;
    if (locationData.terms[3]) {
      isNeighbourhood = true;
    }
    let urlParams = Qs.stringify({
      key: GOOGLE_MAPS_KEY,
      placeid: locationData.place_id,
      language: lang,
    });
    let params;
    let city = `city`;
    let state = `state`;

    try {
      let request = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?${urlParams}`,
      );
      let response = await request.json();
      let {address_components, formatted_address} = response.result;
      params = {
        [city]: isNeighbourhood
          ? address_components[1].long_name
          : address_components[0].long_name,
        [state]: isNeighbourhood
          ? address_components[2].long_name
          : address_components[1].long_name,
      };
      updateAddress(params);
    } catch (e) {
      params = {
        [city]: isNeighbourhood
          ? locationData.terms[1].value
          : locationData.terms[2].value,
        [state]: isNeighbourhood
          ? locationData.terms[2].value
          : locationData.terms[1].value,
      };
      updateAddress(params);
    }
  }

  onItemPress = (locationData, locationDetails) => {
    let params = {
      latitude: locationDetails.geometry.location.lat,
      longitude: locationDetails.geometry.location.lng,
      country: 'KW',
      address: locationData.description,
    };
    this.props.updateAddress(params);
    this.geoCode(locationData, 'en');
  };

  render() {
    const {address} = this.props;

    return (
      <View style={styles.searchInputContainer}>
        <GooglePlacesAutocomplete
          label={I18n.t('search')}
          minLength={1}
          autoFocus={false}
          fetchDetails={true}
          listViewDisplayed={false}
          enablePoweredByContainer={false}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            this.onItemPress(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en',
            components: `country:${address.country}`,
          }}
          styles={autoCompleteStyle}
          placeholderTextColor={colors.lightGrey}
          text={address.address}
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
        />
      </View>
    );
  }
}

const autoCompleteStyle = {
  textInputContainer: {
    margin: 0,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 70000,
  },
  textInput: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: '400',
    textAlign: isRTL ? 'right' : 'left',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  description: {
    textAlign: 'left',
  },
  row: {
    backgroundColor: 'white',
  },
};

const styles = StyleSheet.create({
  container: {},
  searchInputContainer: {
    position: 'absolute',
    top: 20,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 5000,
  },
  textInput: {
    backgroundColor: 'white',
  },
  textInputWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
});
