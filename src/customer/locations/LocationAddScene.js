import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import Button from 'components/Button';
import I18n from 'utils/locale';
import MapPicker from 'customer/locations/components/MapPicker';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import Modal from 'react-native-modal';
import CreateAddressFields from "customer/locations/components/CreateAddressFields";
import GooglePlaces from "./components/GooglePlaces";

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
    address: {
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
    },
    addressCreateFieldsModalVisible:false
  };

  static defaultProps = {
    type: 'pick',
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchLocations());
  }

  saveAddress = () => {
    return Alert.alert(
      `${I18n.t('location_confirm')}`,
      `${I18n.t('location_confirmation_confirm')}`,
      [
        {text: I18n.t('cancel')},
        {
          text: I18n.t('yes'),
          onPress: () => {
            this.showAddressCreateFieldsModal();
          },
        },
      ],
    );
  };

  onValueChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  updateAddressFields = (address: object) => {
    this.setState({
      address:{
        ...this.state.address,
        ...address,
      }
    });
  };

  updateAddress = () => {

    let {address} = this.state;

    return new Promise((resolve, reject) => {
      this.props.actions.updateAddress({address, resolve, reject});
    })
      .then(address => {
        console.log('address', address);

        this.setState(
          {
            address: {
              ...address,
            },
          },
          () => {
            this.hideAddressCreateFieldsModal();
          },
        );
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  showAddressCreateFieldsModal = () => {
    this.setState({
      addressCreateFieldsModalVisible: true,
    });
  };


  hideAddressCreateFieldsModal = () => {
    this.setState({
      addressCreateFieldsModalVisible: false,
    });
  };

  render() {
    let {address,addressCreateFieldsModalVisible}  = this.state;
    let {latitude,longitude}  = address;

    return (
      <View style={{flex: 1}}>

        <GooglePlaces
          updateAddress={this.updateAddressFields}
          address={address}
        />

        <MapPicker
          updateAddress={this.updateAddressFields}
          address={{
            latitude: latitude,
            longitude: longitude,
          }}
        />

        <Modal
          animationType="slide"
          isVisible={addressCreateFieldsModalVisible}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}
          presentationStyle="fullScreen"
          transparent={false}
          useNativeDriver={true}>
          <CreateAddressFields
            onCancel={this.hideAddressCreateFieldsModal}
            onSave={this.updateAddress}
            address={{...address}}
          />
        </Modal>

        <Button
          title={I18n.t('save')}
          onPress={this.saveAddress}
          style={{position:'absolute',right:0,left:0,bottom:10,marginVertical: 10}}
        />

      </View>
    );
  }
}

const mapStateToProps = () => {
  const getLocationsByType = CUSTOMER_SELECTORS.getLocationsByType();
  const mapStateToProps = (state, props) => {
    return {
      locations: getLocationsByType(state, props.navigation.getParam('type','origin')),
    };
  };
  return mapStateToProps;
};

export default connect(mapStateToProps)(LocationAddScene);
