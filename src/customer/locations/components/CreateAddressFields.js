import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import AddressFormFields from 'customer/locations/components/AddressFormFields';
import Divider from 'components/Divider';
import MapButtons from 'customer/locations/components/MapButtons';
import {Title} from 'react-native-paper';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    address: {},
  };

  state = {
    initialized: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initialized: true,
      });
    }, 1000);
  }

  hideScreen = () => {
    this.props.onCancel();
  };

  saveAddress = () => {
    return Alert.alert(
      `${I18n.t('location_confirm')}`,
      `${I18n.t('location_confirmation_confirm')}`,
      [
        {text: I18n.t('cancel')},
        {
          text: I18n.t('ok'),
          onPress: () => {
            this.props.onSave();
          },
        },
      ],
    );
  };

  updateFormFields = (key, value) => {

    this.props.updateAddress({
      [key]:value
    });
  };

  render() {
    const {city, address, state,latitude, longitude } = this.props.address;
    const {initialized} = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.map}>
          {initialized && (
            <MapView
              ref={ref => (this.map = ref)}
              style={{
                height: 250,
              }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              cacheEnabled={true}>
              <MapView.Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              />
            </MapView>
          )}
        </View>

        <Divider style={{marginVertical: 10}} />
        <AddressFormFields
          city={city}
          state={state}
          address={address}
          updateFields={this.updateFormFields}
        />
        <MapButtons save={this.saveAddress} close={this.hideScreen} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputWrapper: {},
  searchInputContainer: {
    flexDirection: 'row',
  },
  map: {
    height: 250,
    backgroundColor: colors.lightGrey,
  },
});
