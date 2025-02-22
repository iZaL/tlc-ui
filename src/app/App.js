import PropTypes from 'prop-types';
import React, {Component} from 'react';
import CodePush from 'react-native-code-push';
import PushNotificationManager from 'app/components/PushNotificationManager';
import Notification from 'app/components/Notification';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import Navigator from 'components/Navigator';
import {AppState, View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {SELECTORS as USER_SELECTOR} from 'guest/common/selectors';
import {CODE_PUSH_ENABLED} from 'utils/env';
import NavigatorService from 'components/NavigatorService';

class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    userType: PropTypes.number,
  };

  static defaultProps = {
    isAuthenticated: false,
    userType: 0,
  };

  componentDidMount() {
    this.props.dispatch(ACTIONS.boot());
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

  logout = () => {
    this.props.dispatch(USER_ACTIONS.logout());
  };

  onReceivePushNotifications = (notification: object) => {
    let {foreground, data} = notification;
    let navigation = NavigatorService;

    if (!foreground) {
      let {type} = data;
      switch (type) {
        case 'started.working':
        case 'stopped.working':
        case 'started.driving':
        case 'stopped.driving':
          let {order_id} = data;
          return navigation.navigate('OrderDetail', {
            orderID: order_id,
          });
          break;
      }
    }
  };

  render() {
    const {app, isAuthenticated, userType, notifications, user} = this.props;

    if (!app.booted) return null;

    if (!app.installed) {
      return <LanguageSelectScene onItemPress={this.onLanguageSelect} />;
    }

    return (
      <View style={{flex: 1}}>
        <PushNotificationManager
          setPushToken={this.setPushToken}
          onReceiveNotifications={this.onReceivePushNotifications}
        />

        <Notification
          {...notifications}
          dismissNotification={this.dismissNotification}
        />

        <Navigator
          isAuthenticated={isAuthenticated}
          userType={userType}
          user={user}
          logout={this.logout}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    notifications: state.notifications,
    isAuthenticated: USER_SELECTOR.isAuthenticated(state),
    userType: USER_SELECTOR.getAuthUserType(state),
    user: USER_SELECTOR.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(App);
