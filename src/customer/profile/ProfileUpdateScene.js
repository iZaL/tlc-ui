import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as PROFILE_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ScrollView} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {ListItem} from 'react-native-paper';

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

  onValueChange = (field, value) => {
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
          padding: 10,
        }}
        contentContainerStyle={{paddingBottom: 100}}>

        <FormTextInput
          onValueChange={this.onUserFieldChange}
          value={name_en}
          field="name_en"
          maxLength={40}
          label={I18n.t('company_name_en')}
        />

        <FormTextInput
          onValueChange={this.onUserFieldChange}
          value={name_ar}
          field="name_ar"
          maxLength={40}
          label={I18n.t('company_name_ar')}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          value={mobile}
          field="mobile"
          maxLength={40}
          label={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          value={phone}
          field="phone"
          maxLength={40}
          label={I18n.t('office_number')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          value={email}
          field="email"
          maxLength={40}
          label={I18n.t('company_email')}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          value={address_en}
          field="address_en"
          label={I18n.t('address_en')}
          multiline={true}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          value={address_ar}
          field="address_ar"
          label={I18n.t('address_ar')}
          keyboardType="phone-pad"
          multiline={true}
          style={{paddingBottom:5}}
          numberOfLines={2}
        />

        <Button
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
