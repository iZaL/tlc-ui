import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import AddressField from 'shipper/locations/components/AddressField';
import Button from 'components/Button';
import I18n from 'utils/locale';
import MapPicker from 'shipper/locations/components/MapPicker';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';

type Type = 'pick|drop';

class LocationAddScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          type: PropTypes.string,
        }),
      }),
    }),
  };

  state: State = {
    label: null,
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

  static defaultProps = {
    type: 'pick',
  };

  componentDidMount() {
    this.props.dispatch(SHIPPER_ACTIONS.fetchLocations());
  }

  saveAddress = () => {};

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
    let {type} = this.props.navigation.state.params;

    return (
      <View style={{flex: 1}}>
        <MapPicker
          updateAddress={this.updateAddressFields}
          address={{...this.state}}
        />

        <AddressField address="wa" updateFields={this.updateFormFields} />

        <Button
          title={I18n.t('save')}
          onPress={this.saveAddress}
          style={{marginVertical: 10}}
        />
      </View>
    );
  }
}

const mapStateToProps = () => {
  const getLocationsByType = SHIPPER_SELECTORS.getLocationsByType();
  const mapStateToProps = (state, props) => {
    return {
      locations: getLocationsByType(state, props.navigation.state.params.type),
    };
  };
  return mapStateToProps;
};

export default connect(mapStateToProps)(LocationAddScene);
