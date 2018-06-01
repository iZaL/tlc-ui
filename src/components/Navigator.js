import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {Routes as AdminRoutes} from 'admin/components/Router';
import {Routes as DriverRoutes} from 'driver/components/Router';
import {Routes as CustomerRoutes} from 'customer/components/Router';
import {AuthRoutes, Routes as DefaultRoutes} from 'guest/components/Router';
import NavigatorService from 'components/NavigatorService';

export default class Navigator extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isAuthenticated !== nextProps.isAuthenticated ||
      this.props.userType !== nextProps.userType
    );
  }

  resolveScreenForUser = userType => {
    switch (userType) {
      case 10:
        return 'Driver';
      case 20:
        return 'Customer';
      case 100:
        return 'Admin';
      default:
        return 'Default';
    }
  };

  render() {
    const {isAuthenticated, userType, user, logout} = this.props;
    const screen = this.resolveScreenForUser(userType);

    const AppNavigatorStack = createStackNavigator(
      {
        Admin: {screen: AdminRoutes},
        Driver: {screen: DriverRoutes},
        Customer: {screen: CustomerRoutes},
        Default: {screen: DefaultRoutes},
        Auth: {screen: AuthRoutes},
      },
      {
        headerMode: 'none',
        initialRouteName: isAuthenticated ? screen : 'Auth',
      },
    );

    return (
      <AppNavigatorStack
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{isAuthenticated, logout, user}}
      />
    );
  }
}
