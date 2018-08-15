import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import Divider from 'components/Divider';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import {Title} from 'react-native-paper';
import I18n from 'utils/locale';
import Button from 'components/Button';
import ListModal from 'components/ListModal';
import Modal from 'components/Modal';
import Dropdown from 'components/Dropdown';
import DocumentUpload from 'components/DocumentUpload';
import TextInput from 'components/TextInput';

class BankAccountsUpdateScene extends Component {
  state = {
    name: null,
    address: null,
    account_number: null,
    iban: null,
    beneficiary_name: null,
    beneficiary_address: null,
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let {
  //     name,
  //     address,
  //     account_number,
  //     iban,
  //     beneficiary_name,
  //     beneficiary_address,
  //   } = nextProps;
  //   return {
  //     name:name,
  //     address:address,
  //     account_number:account_number,
  //     iban:iban,
  //     beneficiary_name:beneficiary_name,
  //     beneficiary_address:beneficiary_address,
  //   };
  // }

  componentDidMount() {}

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  save = () => {
    this.props.dispatch(
      DRIVER_ACTIONS.saveBankAccounts({
        ...this.state,
      }),
    );
  };

  render() {
    const {
      name,
      address,
      account_number,
      iban,
      beneficiary_name,
      beneficiary_address,
    } = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          padding: 10,
        }}>
        <TextInput
          label={I18n.t('bank_name')}
          value={name}
          field="name"
          onValueChange={this.onValueChange}
          style={{flex: 1, marginRight: 5}}
        />

        <TextInput
          label={I18n.t('bank_address')}
          value={address}
          field="address"
          onValueChange={this.onValueChange}
          style={{flex: 1, marginRight: 5}}
        />
        <TextInput
          label={I18n.t('account_number')}
          value={account_number}
          field="account_number"
          onValueChange={this.onValueChange}
          style={{flex: 1, marginRight: 5}}
        />
        <TextInput
          label={I18n.t('iban')}
          value={iban}
          field="iban"
          onValueChange={this.onValueChange}
          style={{flex: 1, marginRight: 5}}
        />
        <TextInput
          label={I18n.t('beneficiary_name')}
          value={beneficiary_name}
          field="beneficiary_name"
          onValueChange={this.onValueChange}
          style={{flex: 1, marginRight: 5}}
        />
        <TextInput
          label={I18n.t('beneficiary_address')}
          value={beneficiary_address}
          field="beneficiary_address"
          onValueChange={this.onValueChange}
          style={{flex: 1, marginRight: 5}}
        />

        <Button
          onPress={this.save}
          style={{marginTop: 20}}
          title={I18n.t('save')}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
    trailer: DRIVER_SELECTORS.getTrailer(state),
    trailer_makes: TRUCK_SELECTORS.getTrailerMakes(state),
    trailer_types: TRUCK_SELECTORS.getTrailerTypes(state),
  };
}

export default connect(mapStateToProps)(BankAccountsUpdateScene);
