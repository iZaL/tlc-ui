import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ScrollView, View} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';
import Touchable from 'react-native-platform-touchable';
import Separator from 'components/Separator';

type State = {
  mobile: string,
};

class EmployeeEditScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          employee: PropTypes.shape({
            mobile: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            name_en: PropTypes.string.isRequired,
            name_ar: PropTypes.string.isRequired,
            driver_interaction: PropTypes.bool.isRequired,
          }),
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {
      state: {
        params: {
          employee: {
            mobile: '',
            phone: '',
            email: '',
            name_en: '',
            name_ar: '',
            driver_interaction: true,
          },
        },
      },
    },
  };

  constructor(props) {
    super(props);
    const {
      mobile,
      phone,
      email,
      name_en,
      name_ar,
      driver_interaction,
    } = props.navigation.state.params.employee;
    this.state = {
      mobile,
      phone,
      email,
      name_en,
      name_ar,
      driver_interaction,
    };
  }

  onValueChange = (field, value) => {
    switch (field) {
      default:
        this.setState({[field]: value});
        break;
    }
  };

  saveProfile = () => {
    const {id} = this.props.navigation.state.params.employee;
    let params = {
      id,
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
          field={name_en}
          value={name_en}
          maxLength={40}
          label={I18n.t('name_en')}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field={name_ar}
          value={name_ar}
          maxLength={40}
          label={I18n.t('name_ar')}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field={mobile}
          value={mobile}
          maxLength={40}
          label={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field={phone}
          value={phone}
          maxLength={40}
          label={I18n.t('office_number')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field={email}
          value={email}
          maxLength={40}
          label={I18n.t('company_email')}
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
          onPress={this.saveProfile}
          title={I18n.t('save')}
          style={{marginTop: 50}}
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

export default connect(mapStateToProps)(EmployeeEditScene);
