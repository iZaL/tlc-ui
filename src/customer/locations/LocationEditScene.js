import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import CreateAddressFields from 'customer/locations/components/CreateAddressFields';

class LocationEditScene extends Component {
  state: State = {
    address_id: null,
    city: null,
    address: null,
    state: null,
    country: 'KW',
    latitude: 29.3759,
    longitude: 47.9774,
  };

  static getDerivedStateFromProps(props) {
    let address = props.navigation.getParam('address');
    console.log('this.props.navigation.getParam', address);
    return {
      address_id: address.id,
      city: address.city,
      address: address.address,
      state: address.state,
      latitude: address.latitude,
      longitude: address.longitude,
      type: address.type,
    };
  }

  updateAddressFields = (address: object) => {
    this.setState({
      ...address,
    });
  };

  updateAddress = () => {
    let address = this.state;
    return new Promise((resolve, reject) => {
      this.props.dispatch(
        CUSTOMER_ACTIONS.saveAddress({address, resolve, reject}),
      );
    })
      .then(addressID => {})
      .catch(e => {});
  };

  render() {
    let {...address} = this.state;
    console.log('address', address);
    return (
      <View style={{flex: 1}}>
        <CreateAddressFields
          onCancel={this.hideAddressCreateFieldsModal}
          onSave={this.updateAddress}
          updateAddress={this.updateAddressFields}
          address={{...address}}
          hideCancelButton={true}
        />
      </View>
    );
  }
}

const mapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      state,
    };
  };
  return mapStateToProps;
};

export default connect(mapStateToProps)(LocationEditScene);
