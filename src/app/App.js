import PropTypes from 'prop-types';
import React, {Component} from 'react';
import CodePush from 'react-native-code-push';
import BackgroundGeolocation from 'react-native-background-geolocation';

import PushNotificationManager from 'app/components/PushNotificationManager';
import Notification from 'app/components/Notification';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import Navigator from 'components/Navigator';

import {SafeAreaView, AppState} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {SELECTORS as USER_SELECTOR} from 'guest/common/selectors';
import {CODE_PUSH_ENABLED} from 'utils/env';

class App extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool,
    userType:PropTypes.number
  };

  static defaultProps = {
    isAuthenticated:false,
    userType:0
  };

  componentDidMount() {

    this.props.dispatch(ACTIONS.boot());
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeListeners();
    AppState.addEventListener('change', this.handleAppStateChange);

    if (CODE_PUSH_ENABLED) {
      CodePush.sync();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = appState => {};

  onLanguageSelect = name => {
    this.props.dispatch(ACTIONS.setLanguage(name));
    this.props.dispatch(ACTIONS.setInstalled(true));
  };

  setPushToken = token => {
    this.props.dispatch(ACTIONS.setPushToken(token));
  };

  dismissNotification = () => {
    this.props.dispatch(ACTIONS.dismissNotification());
  };

  navigateToScene = (scene, params) => {
    // this.props.dispatch(ACTIONS.navigateToScene(scene, params));
  };

  logout = () => {
    this.props.dispatch(USER_ACTIONS.logout());
  };

  render() {
    const {app, isAuthenticated, userType, notifications} = this.props;

    if (!app.booted) return null;

    if (!app.installed) {
      return <LanguageSelectScene onItemPress={this.onLanguageSelect} />;
    }

    return (
      <SafeAreaView style={{flex: 1}}>

        <PushNotificationManager
          setPushToken={this.setPushToken}
          navigateToScene={this.navigateToScene}
        />

        <Notification
          message={notifications.message}
          type={notifications.type}
          dismissNotification={this.dismissNotification}
        />

        <Navigator
          isAuthenticated={isAuthenticated}
          userType={userType}
          logout={this.logout}
        />

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    notifications:state.notifications,
    isAuthenticated: USER_SELECTOR.isAuthenticated(state),
    userType: USER_SELECTOR.getAuthUserType(state),
  };
}

export default connect(mapStateToProps)(App);
