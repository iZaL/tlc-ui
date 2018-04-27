import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {View} from 'react-native';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import I18n from 'utils/locale';
import CheckedListItem from 'components/CheckedListItem';

class EmployeeAddScene extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title:
        (navigation.state.params && navigation.state.params.name) ||
        I18n.t('employee_add'),
    };
  };

  constructor(props) {
    super(props);
    let {name_en, mobile, phone, email, driver_interaction} =
      props.navigation.state.params || {};

    this.state = {
      name_en: name_en,
      mobile: mobile,
      phone: phone,
      email: email,
      driver_interaction: driver_interaction,
    };
  }

  onValueChange = (field, value) => {
    switch (field) {
      default:
        this.setState({[field]: value});
        break;
    }
  };

  saveEmployee = () => {
    let params = {
      ...this.state,
    };
    this.props.dispatch(CUSTOMER_ACTIONS.saveEmployee(params));
  };

  render() {
    const {
      mobile,
      phone,
      email,
      name_en,
      name_ar,
      driver_interaction,
    } = this.state;

    return (
      <View>
        <View style={{paddingTop: 0, padding: 10}}>
          <TextInput
            onValueChange={this.onValueChange}
            field="name"
            value={name_en}
            maxLength={40}
            label={I18n.t('name')}
          />

          <TextInput
            onValueChange={this.onValueChange}
            field="mobile"
            value={mobile}
            maxLength={40}
            label={I18n.t('mobile')}
            keyboardType="phone-pad"
          />

          <TextInput
            onValueChange={this.onValueChange}
            field="phone"
            value={phone}
            maxLength={40}
            label={I18n.t('office_number')}
            keyboardType="phone-pad"
          />

          <TextInput
            onValueChange={this.onValueChange}
            value={email}
            field="email"
            maxLength={40}
            label={I18n.t('business_email')}
            keyboardType="email-address"
          />

          <CheckedListItem
            title={I18n.t('can_communicate_with_driver')}
            checked={driver_interaction}
            onPress={() => {
              this.onValueChange('driver_interaction', !driver_interaction);
            }}
            style={{paddingVertical: 10}}
          />
        </View>

        <Button onPress={this.saveEmployee} title={I18n.t('save')} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: CUSTOMER_SELECTORS.getProfile(state),
  };
}

export default connect(mapStateToProps)(EmployeeAddScene);
