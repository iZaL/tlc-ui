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
import CreateAddressFields from 'customer/locations/components/CreateAddressFields';
import GooglePlaces from 'customer/locations/components/GooglePlaces';

type Type = 'origin|destination';

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
      city: '',
      address: '',
      state: '',
      country: 'KW',
      latitude: 29.3759,
      longitude: 47.9774,
    },
    addressCreateFieldsModalVisible: false,
  };

  static defaultProps = {
    type: 'origin',
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
            let {address} = this.state;
            return new Promise((resolve, reject) => {
              this.props.dispatch(
                CUSTOMER_ACTIONS.saveAddress({address, resolve, reject}),
              );
            })
              .then(addressID => {
                console.log('addressID', addressID);
                this.setState(
                  {address: {...address, address_id: addressID}},
                  this.showAddressCreateFieldsModal(),
                );
              })
              .catch(e => {});
          },
        },
      ],
    );
  };

  updateAddressFields = (address: object) => {
    this.setState({
      address: {
        ...this.state.address,
        ...address,
        type: this.props.navigation.getParam('type'),
      },
    });
  };

  updateAddress = () => {
    let {address} = this.state;
    return new Promise((resolve, reject) => {
      this.props.dispatch(
        CUSTOMER_ACTIONS.saveAddress({address, resolve, reject}),
      );
    })
      .then(addressID => {
        this.hideAddressCreateFieldsModal();
      })
      .catch(e => {});
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
    let {address, addressCreateFieldsModalVisible} = this.state;
    let {latitude, longitude} = address;

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
          useNativeDriver={true}
          updateAddress={this.updateAddressFields}>
          <CreateAddressFields
            onCancel={this.hideAddressCreateFieldsModal}
            onSave={this.updateAddress}
            updateAddress={this.updateAddressFields}
            address={{...address}}
          />
        </Modal>

        <Button
          title={I18n.t('save')}
          onPress={this.saveAddress}
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 10,
            marginVertical: 10,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = () => {
  const getLocationsByType = CUSTOMER_SELECTORS.getLocationsByType();
  const mapStateToProps = (state, props) => {
    return {
      locations: getLocationsByType(
        state,
        props.navigation.getParam('type', 'origin'),
      ),
    };
  };
  return mapStateToProps;
};

export default connect(mapStateToProps)(LocationAddScene);
