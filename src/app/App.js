import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import NavigatorService from 'common/navigator_service';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import CodePush from 'react-native-code-push';
import {CODEPUSH_ENABLED} from 'common/env';
import PushNotificationManager from './components/PushNotificationManager';
import Notification from './components/Notification';
import {ACTIONS} from './common/actions';
import {createRootNavigator} from "../common/navigator";

class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (CODEPUSH_ENABLED) {
      CodePush.sync();
    }
    this.props.dispatch(ACTIONS.boot());
  }

  onLanguageSelect = name => {
    this.props.dispatch(ACTIONS.setLanguage(name));
    this.props.dispatch(ACTIONS.setBootstrapped(true));
  };

  setPushToken = token => {
    this.props.dispatch(ACTIONS.setPushToken(token));
  };

  dismissNotification = () => {
    this.props.dispatch(ACTIONS.dismissNotification());
  };

  navigateToScene = (scene, params) => {
    this.props.dispatch(ACTIONS.navigateToScene(scene, params));
  };

  render() {
    const {app, isAuthenticated, userType} = this.props;

    if (!app.booted) return null;

    if (!app.bootstrapped) {
      return <LanguageSelectScene onItemPress={this.onLanguageSelect}/>;
    }

    const Navigator = createRootNavigator(isAuthenticated,userType);

    return (
      <SafeAreaView style={{flex: 1}}>
        {app.notifications.message && (
          <Notification
            message={app.notifications.message}
            messageType={app.notifications.messageType}
            dismissNotification={this.dismissNotification}
          />
        )}

        <PushNotificationManager
          setPushToken={this.setPushToken}
          navigateToScene={this.navigateToScene}
        />

        <Navigator
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
          // navigation={addNavigationHelpers({
          //   dispatch: this.props.dispatch,
          //   state: this.props.navigation,
          // })}
        />

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.appReducer,
    isAuthenticated: state.userReducer.isAuthenticated,
    userType: state.userReducer.userType,
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps)(App);
