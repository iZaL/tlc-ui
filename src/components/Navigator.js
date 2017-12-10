import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Routes as AdminRoutes} from 'admin/components/Router';
import {Routes as DriverRoutes} from 'driver/components/Router';
import {Routes as ShipperRoutes} from 'shipper/components/Router';
import {AuthRoutes, Routes as DefaultRoutes} from 'user/components/Router';
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
      case 'driver':
        return 'Driver';
      case 'shipper':
        return 'Shipper';
      case 'admin':
        return 'Admin';
      default:
        return 'Default';
    }
  };

  render() {
    const {isAuthenticated, userType, logout} = this.props;
    const screen = this.resolveScreenForUser(userType);

    const AppNavigator = StackNavigator(
      {
        Admin: {screen: AdminRoutes},
        Driver: {screen: DriverRoutes},
        Shipper: {screen: ShipperRoutes},
        Default: {screen: DefaultRoutes},
        Auth: {screen: AuthRoutes},
      },
      {
        headerMode: 'none',
        initialRouteName: isAuthenticated ? screen : 'Auth',
      },
    );
    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{isAuthenticated, logout}}
      />
    );
  }
}
