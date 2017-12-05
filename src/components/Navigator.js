import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Routes as AdminRoutes} from 'admin/common/routes';
import {Routes as DriverRoutes} from 'driver/common/routes';
import {Routes as ShipperRoutes} from 'shipper/common/routes';
import {AuthRoutes, Routes as DefaultRoutes} from 'user/common/routes';
import NavigatorService from 'components/NavigatorService';

export default class Navigator extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isAuthenticated !== nextProps.isAuthenticated ||
      this.props.userType !== nextProps.userType
    );
  }

  render() {
    let {isAuthenticated, userType, logout} = this.props;
    let userScreen;

    if (userType === 'driver') {
      userScreen = 'Driver';
    } else if (userType === 'shipper') {
      userScreen = 'Shipper';
    } else if (userType === 'admin') {
      userScreen = 'Admin';
    } else {
      userScreen = 'Default';
    }

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
        initialRouteName: isAuthenticated ? userScreen : 'Auth',
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
