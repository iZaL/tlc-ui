import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import ForgotScene from './scenes/ForgotScene';
import ConfirmScene from './scenes/ConfirmScene';
import PasswordUpdateScene from './scenes/PasswordUpdateScene';
import {ACTIONS} from './common/actions';
import {TouchableHighlight} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OTPScene from "./scenes/OTPScene";

class OTP extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    code: '',
  };

  confirmOTP = () => {
    this.props.actions.confirmOTP({
      email: this.props.navigation.state.params.email,
      code:this.state.code
    });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  resendOTP = () => {
    console.log('resend otp');
  };

  render() {
    const {code, } = this.state;
    return (
      <OTPScene
        onFieldChange={this.onFieldChange}
        code={code}
        onButtonPress={this.confirmOTP}
        resendCode={this.resendOTP}
      />
    );

  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS, ...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
