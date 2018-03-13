import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'guest/common/actions';
import LoginScene from 'guest/auth/scenes/LoginScene';
import {Alert} from 'react-native';
import I18n from 'utils/locale';

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

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    const {auth} = this.props;
    return (
      <LoginScene
        {...this.state}
        handleLogin={this.handleLogin}
        handleRegisterRoute={this.handleRegisterRoute}
        handleForgotPasswordRoute={this.handleForgotPasswordRoute}
        onFieldChange={this.onFieldChange}
        busy={auth.login.busy}
      />
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
