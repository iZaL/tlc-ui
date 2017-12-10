import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {ACTIONS} from 'guest/common/actions';
import OTPScene from 'guest/auth/scenes/OTPScene';

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
      mobile: this.props.navigation.state.params.mobile,
      code: this.state.code,
    });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  resendOTP = () => {
    console.log('resend otp');
  };

  render() {
    const {code} = this.state;
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
    auth: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
