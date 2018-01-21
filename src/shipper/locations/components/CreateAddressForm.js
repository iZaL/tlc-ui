import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Modal, StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import Button from 'components/Button';
import MapPicker from 'shipper/locations/components/MapPicker';
import colors from 'assets/theme/colors';
import AddressFormFields from 'shipper/locations/components/AddressFormFields';

type State = {
  label: string,
  block: string,
  street: string,
  avenue: string,
  building: string,
  latitude: string,
  longitude: string,
  mapPickerVisibility: boolean,
  address: Object,
};

export default class CreateAddressForm extends PureComponent {
  state: State = {
    label: null,
    block: '',
    street: '',
    avenue: '',
    building: '',
    city_en: '',
    city_ar: '',
    address_en: '',
    address_ar: '',
    state_en: '',
    state_ar: '',
    country: 'KW',
    latitude: 29.3759,
    longitude: 47.9774,
  };

  saveAddress = () => {
    this.props.onPress(this.state);
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  updateAddressFields = (address: object) => {
    this.setState({
      ...this.state.address,
      ...address,
    });
  };

  render() {
    const {block, street, avenue, building, mapPickerVisibility} = this.state;

    return (

        <View style={styles.container}>
          <AddressFormFields
            block={block}
            avenue={avenue}
            street={street}
            building={building}
            updateFields={this.updateFormFields}
          />

          <MapPicker
            updateAddress={this.updateAddressFields}
            address={{...this.state}}
          />

          <View style={styles.buttonsContainer}>
            <Button
              title={I18n.t('save')}
              onPress={this.saveAddress}
              style={styles.button}
              background="success"
            />
          </View>
        </View>
    );
  }
}

CreateAddressForm.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginVertical: 20,
    padding: 10,
    opacity: 1,
    backgroundColor: colors.fadedWhite,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 0,
  },
});
