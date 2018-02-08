import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Routes as AdminRoutes} from 'admin/components/Router';
import {Routes as DriverRoutes} from 'driver/components/Router';
import {Routes as ShipperRoutes} from 'shipper/components/Router';
import {AuthRoutes, Routes as DefaultRoutes} from 'guest/components/Router';
import NavigatorService from 'components/NavigatorService';
import RootModal from '../app/RootModal';

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
        return 'Shipper';
      case 100:
        return 'Admin';
      default:
        return 'Default';
    }
  };

  render() {
    const {isAuthenticated, userType, logout} = this.props;
    const screen = this.resolveScreenForUser(userType);

    const RootModalStack = StackNavigator(
      {
        main: {screen: RootModal},
      },
      {
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerMode: 'none',
      },
    );

    const AppNavigatorStack = StackNavigator(
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

    const RootNavigator = StackNavigator(
      {
        RootModal: {
          screen: RootModal,
          navigationOptions: {
            gesturesEnabled: false,
          },
        },
        App: {screen: AppNavigatorStack},
      },
      {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: 'App',
        // cardStyle: {
        //   backgroundColor: 'transparent',
        // },
      },
    );

    return (
      <RootNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{isAuthenticated, logout}}
      />
    );
  }
}
