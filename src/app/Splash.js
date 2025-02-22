import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import SplashScene from 'app/components/SplashScene';

function mapStateToProps(state) {
  return {
    message: state.app.notifications.message,
    messageType: state.app.notifications.messageType,
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScene);
