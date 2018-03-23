import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as PROFILE_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ScrollView} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';

type State = {
  mobile: string,
};

class ProfileUpdateScene extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      meta: PropTypes.shape({
        name_en: PropTypes.string.isRequired,
        name_ar: PropTypes.string.isRequired,
        address_en: PropTypes.string.isRequired,
        address_ar: PropTypes.string.isRequired,
      }),
    }),
  };

  static defaultProps = {
    profile: {
      mobile: '',
      phone: '',
      email: '',
      meta: {
        name_en: '',
        name_ar: '',
        address_en: '',
        address_ar: '',
      },
    },
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchProfile());
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state !== nextState;
  // }

  state: State = {
    mobile: '',
    phone: '',
    email: '',
    address_en: '',
    address_ar: '',
    user: {
      name_en: '',
      name_ar: '',
    },
  };

  static getDerivedStateFromProps(nextProps) {
    const {
      mobile,
      phone,
      email,
      meta: {address_en, address_ar, name_en, name_ar},
    } = nextProps.profile;

    return {
      mobile,
      phone,
      email,
      address_en,
      address_ar,
      user: {
        name_en,
        name_ar,
      },
    };
  }

  onFieldChange = (field, value) => {
    if (value) {
      switch (field) {
        default:
          this.setState({[field]: value});
          break;
      }
    }
  };

  onUserFieldChange = (field, value) => {
    if (value) {
      switch (field) {
        default:
          this.setState({
            user: {
              ...this.state.user,
              [field]: value,
            },
          });
          break;
      }
    }
  };

  saveProfile = () => {
    let params = {
      ...this.state,
    };
    this.props.dispatch(PROFILE_ACTIONS.saveProfile(params));
  };

  render() {
    const {mobile, phone, email, user, address_en, address_ar} = this.state;

    const {name_en, name_ar} = user;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        <FormLabel title={I18n.t('company_name_en')} />
        <FormTextInput
          onChangeText={value => this.onUserFieldChange('name_en', value)}
          value={name_en}
          maxLength={40}
          placeholder={I18n.t('company_name_en')}
        />

        <FormLabel title={I18n.t('company_name_ar')} />
        <FormTextInput
          onChangeText={value => this.onUserFieldChange('name_ar', value)}
          value={name_ar}
          maxLength={40}
          placeholder={I18n.t('company_name_ar')}
        />

        <FormLabel title={I18n.t('mobile')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('office_number')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('phone', value)}
          value={phone}
          maxLength={40}
          placeholder={I18n.t('office_number')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('company_email')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('email', value)}
          value={email}
          maxLength={40}
          placeholder={I18n.t('company_email')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('address_en')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('address_en', value)}
          value={address_en}
          placeholder={I18n.t('address_en')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('address_ar')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('address_ar', value)}
          value={address_ar}
          placeholder={I18n.t('address_ar')}
          keyboardType="phone-pad"
        />

        <FormSubmit
          onPress={this.saveProfile}
          title={I18n.t('profile_update')}
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

export default connect(mapStateToProps)(ProfileUpdateScene);
