import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ScrollView, View} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';
import Touchable from 'react-native-platform-touchable';
import Divider from 'components/Divider';
import CheckedListItem from "../../components/CheckedListItem";
import ListItem from "../../components/ListItem";

type State = {
  mobile: string,
};

class EmployeeAddScene extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state !== nextState;
  // }

  state: State = {
    mobile: '',
    phone: '',
    email: '',
    name_en: '',
    name_ar: '',
    driver_interaction: true,
  };

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
        <View style={{paddingTop:0,padding:10}}>
          <FormTextInput
            onValueChange={this.onValueChange}
            field="name"
            value={name_en}
            maxLength={40}
            label={I18n.t('name')}
          />

          <FormTextInput
            onValueChange={this.onValueChange}
            field="mobile"
            value={mobile}
            maxLength={40}
            label={I18n.t('mobile')}
            keyboardType="phone-pad"
          />

          <FormTextInput
            onValueChange={this.onValueChange}
            field="phone"
            value={phone}
            maxLength={40}
            label={I18n.t('office_number')}
            keyboardType="phone-pad"
          />

          <FormTextInput
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
              this.onValueChange('driver_interaction', !driver_interaction)
            }}
            style={{paddingVertical: 10}}
          />
        </View>

        <Button
          onPress={this.saveEmployee}
          title={I18n.t('save')}
        />

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
