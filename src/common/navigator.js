import React from 'react';

import {StackNavigator} from 'react-navigation';
import {Routes as AdminRoutes} from 'admin/common/routes';
import {Routes as DriverRoutes} from 'driver/common/routes';
import {Routes as ShipperRoutes} from 'shipper/common/routes';
import {Routes as DefaultRoutes} from 'common/routes';
import {AuthRoutes} from 'user/common/routes';

export const createRootNavigator = (signedIn = false, userType = 'default') => {
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

  return StackNavigator(
    {
      Admin: {screen: AdminRoutes},
      Driver: {screen: DriverRoutes},
      Shipper: {screen: ShipperRoutes},
      Default: {screen: DefaultRoutes},
      Auth: {screen: AuthRoutes},
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? userScreen : 'Auth',
    },
  );
};
