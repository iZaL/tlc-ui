import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'guest/common/actions';
import {Alert, View} from 'react-native';
import I18n from 'utils/locale';
import Button from 'components/Button';
import TextInput from 'components/TextInput';

class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  state = {
    email: 'customer@test.com',
    password: 'password',
  };

  handleLogin = () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.actions.login(credentials, this.props.navigation);
  };

  handleRegisterRoute = () => {
    return Alert.alert(I18n.t('account_select_type'), '', [
      {
        text: I18n.t('driver'),
        onPress: () => {
          this.props.navigation.navigate('RegisterScreen', {
            isCustomer: false,
          });
        },
      },
      {
        text: I18n.t('customer'),
        onPress: () => {
          this.props.navigation.navigate('RegisterScreen', {
            isCustomer: true,
          });
        },
      },
    ]);
  };

  handleForgotPasswordRoute = () => {
    this.props.navigation.navigate('ForgotScreen');
  };

  onValueChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    const {email, password} = this.state;

    const {busy} = this.props.auth;

    return (
      <View style={{flex: 1, padding: 10}}>
        <View style={{padding: 5, paddingTop: 64}}>
          <TextInput
            label={I18n.t('email')}
            onValueChange={this.onValueChange}
            field="email"
            value={email}
            maxLength={40}
            keyboardType="email-address"
          />

          <TextInput
            label={I18n.t('password')}
            onValueChange={this.onValueChange}
            field="password"
            value={password}
            maxLength={40}
            secureTextEntry={true}
          />
        </View>

        <Button
          onPress={this.handleLogin}
          disabled={busy}
          title={busy ? I18n.t('logging_in') : I18n.t('login').toUpperCase()}
          style={{marginTop: 25}}
        />

        <Button
          onPress={this.handleRegisterRoute}
          title={I18n.t('register').toUpperCase()}
          style={{marginTop: 25}}
          raised={false}
          primary={false}
        />

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(ACTIONS, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
