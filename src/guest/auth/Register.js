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
          isCustomer: PropTypes.bool.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {
      state: {
        params: {
          isCustomer: false,
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
    let {isCustomer} = this.props.navigation.state.params;

    let credentials = {
      ...this.state,
      name_ar: isCustomer ? this.state.name_ar : this.state.name_en,
      // name_hi: isCustomer ? this.state.name_hi : this.state.name_en,
      isCustomer: this.props.navigation.state.params.isCustomer,
    };

    this.props.actions.register(credentials);
  };

  onValueChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    const {auth} = this.props;
    const {isCustomer} = this.props.navigation.state.params;
    return (
      <RegisterScene
        {...this.state}
        handleRegister={this.handleRegister}
        onValueChange={this.onValueChange}
        busy={auth.register.busy}
        isCustomer={isCustomer}
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
