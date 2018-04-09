import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import I18n from 'utils/locale';
import FormTextInput from 'components/FormTextInput';
import {Button} from 'react-native-paper';
import DocumentUpload from 'components/DocumentUpload';

class ProfileInfoUpdateScene extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  state = {
    isPasswordModalVisible: false,
    user: {
      mobile: '',
      email: '',
      password: '',
      image: '',
      name: '',
      password_confirmation: '',
      profile: {
        mobile: '',
        phone: '',
      },
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user === prevState.user) {
      return null;
    }

    let {name, email, mobile, profile, image} = nextProps.user;

    return {
      user: {
        mobile: mobile,
        email: email,
        image: image,
        name: name,
        profile: {
          mobile: profile.mobile,
          phone: profile.phone,
        },
      },
    };
  }

  onValueChange = (field, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [field]: value,
      },
    });
  };

  onDriverFieldChange = (name, value) => {
    this.setState({
      user: {
        ...this.state.user,
        profile: {
          ...this.state.user.profile,
          [name]: value,
        },
      },
    });
  };

  save = () => {};

  render() {
    let {
      name,
      email,
      mobile,
      image,
      profile,
      password,
      password_confirmation,
    } = this.state.user;

    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        contentContainerStyle={{padding: 10}}>
        <DocumentUpload
          onPress={image => this.onValueChange('image', image)}
          image={image}
          style={{
            flex: 1,
            marginHorizontal: 15,
            width: 110,
            height: 110,
            borderRadius: 55,
            alignSelf: 'center',
          }}
          imageStyle={{borderRadius: 50}}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field="name"
          value={name}
          maxLength={40}
          label={I18n.t('name')}
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field="email"
          value={email}
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormTextInput
          onValueChange={this.onValueChange}
          field="mobile"
          value={mobile}
          maxLength={40}
          label={I18n.t('mobile_primary')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={this.onDriverFieldChange}
          field="mobile"
          value={profile ? profile.mobile : ''}
          maxLength={40}
          label={I18n.t('contact_mobile1')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={this.onDriverFieldChange}
          field="phone"
          value={profile ? profile.phone : ''}
          maxLength={40}
          label={I18n.t('contact_mobile2')}
          keyboardType="phone-pad"
        />

        <Button
          onPress={this.save}
          raised
          primary
          dark
          style={{padding: 10, marginTop: 20}}>
          {I18n.t('save')}
        </Button>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUserWithProfile(state),
  };
}

export default connect(mapStateToProps)(ProfileInfoUpdateScene);
