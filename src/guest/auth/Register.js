/**
 @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from 'guest/common/actions';
import RegisterScene from 'guest/auth/scenes/RegisterScene';

type State = {
  name: string,
  email: string,
  password: string,
  mobile: string,
};

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          isShipper: PropTypes.bool.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {
      state: {
        params: {
          isShipper: false,
        },
      },
    },
  };

  state: State = {
    name_en: 'Afzal',
    name_ar: 'Afzal Ar',
    name_hi: 'Afzal Hi',
    email: 'z4ls@live.com',
    mobile: '+96597978803',
    password: 'password',
    password_confirmation: 'password',
  };

  handleRegister = () => {
    let {isShipper} = this.props.navigation.state.params;

    let credentials = {
      ...this.state,
      name_ar: isShipper ? this.state.name_ar : this.state.name_en,
      // name_hi: isShipper ? this.state.name_hi : this.state.name_en,
      isShipper: this.props.navigation.state.params.isShipper,
    };

    this.props.actions.register(credentials);
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    const {auth} = this.props;
    const {isShipper} = this.props.navigation.state.params;
    return (
      <RegisterScene
        {...this.state}
        handleRegister={this.handleRegister}
        onFieldChange={this.onFieldChange}
        busy={auth.register.busy}
        isShipper={isShipper}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
