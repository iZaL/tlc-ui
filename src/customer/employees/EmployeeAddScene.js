import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ScrollView} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import FormCheck from 'components/FormCheck';
import {View} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {Checkbox} from 'react-native-paper';
import Touchable from 'react-native-platform-touchable';
import Separator from 'components/Separator';

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
        }}>
        <FormTextInput
          onValueChange={this.onValueChange}
          field="name_en"
          value={name_en}
          maxLength={40}
          label={I18n.t('name_en')}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field="name_ar"
          value={name_ar}
          maxLength={40}
          label={I18n.t('name_ar')}
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

        <Touchable
          onPress={() =>
            this.onValueChange('driver_interaction', !driver_interaction)
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FormLabel
              title={I18n.t('can_communicate_with_driver')}
              style={{flex: 1}}
            />
            <FormCheck
              checked={driver_interaction}
              onPress={() =>
                this.onValueChange('driver_interaction', !driver_interaction)
              }
            />
          </View>
        </Touchable>

        <Separator style={{marginVertical: 10}} />

        <FormSubmit
          onPress={this.saveEmployee}
          title={I18n.t('save')}
          style={{marginTop: 20}}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: CUSTOMER_SELECTORS.getProfile(state),
  };
}

export default connect(mapStateToProps)(EmployeeAddScene);
