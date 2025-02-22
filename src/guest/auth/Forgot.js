import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import ForgotScene from 'guest/auth/scenes/ForgotScene';
import ConfirmScene from 'guest/auth/scenes/ConfirmScene';
import PasswordUpdateScene from 'guest/auth/scenes/PasswordUpdateScene';
import {ACTIONS} from 'guest/common/actions';

class Forgot extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    confirmationCode: '',
    password: '',
    password_confirmation: '',
  };

  onForgotPassword = () => {
    let {email} = this.state;
    this.props.actions.forgotPassword({email: email});
  };

  onRecoverPassword = () => {
    this.props.actions.recoverPassword({
      email: this.state.email,
      confirmation_code: this.state.confirmationCode,
    });
  };

  onUpdatePassword = () => {
    this.props.actions.updatePassword({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    });
  };

  onValueChange = (field, value) => {
    this.setState({[field]: value});
  };

  goBack = () => {
    const navigationAction = NavigationActions.back(null);
    this.props.navigation.dispatch(navigationAction);
  };

  render() {
    const {auth} = this.props;
    const {confirmationCode, password} = this.state;
    const confirmedPassword = this.state.password_confirmation;

    let renderingComponent;

    if (auth.showPasswordUpdateScene) {
      renderingComponent = (
        <PasswordUpdateScene
          onValueChange={this.onValueChange}
          password={password}
          confirmedPassword={confirmedPassword}
          onUpdatePassword={this.onUpdatePassword}
          onRightButtonPress={this.goBack}
        />
      );
    } else if (auth.showPasswordRecoverScene) {
      renderingComponent = (
        <ConfirmScene
          onRecoverPassword={this.onRecoverPassword}
          onValueChange={this.onValueChange}
          confirmationCode={confirmationCode}
          onForgotPassword={this.onForgotPassword}
          onRightButtonPress={this.goBack}
        />
      );
    } else {
      renderingComponent = (
        <ForgotScene
          {...this.state}
          onForgotPassword={this.onForgotPassword}
          onValueChange={this.onValueChange}
          busy={auth.login.busy}
          onRightButtonPress={this.goBack}
        />
      );
    }

    return renderingComponent;
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS, ...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forgot);
