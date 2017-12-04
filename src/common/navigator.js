import React from 'react';
import Login from 'user/Login';
import Register from 'user/Register';
import Forgot from 'user/Forgot';
import OTP from 'user/OTP';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {Drawer as AdminDrawer} from 'admin/components/Drawer';
import {Drawer as DriverDrawer} from 'driver/components/Drawer';
import {Drawer as ShipperDrawer} from 'shipper/components/Drawer';
import {Drawer as DefaultDrawer} from 'components/Drawer';
import Home from 'home/Home';
import Settings from 'home/Settings';
import CreateLoad from 'loads/CreateLoad';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';

export const AuthStack = StackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    RegisterScreen: {
      screen: Register,
    },
    ForgotScreen: {
      screen: Forgot,
    },
    OTPScreen: {
      screen: OTP,
    }
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: (
          <Touchable
            onPress={() => navigation.navigate('DrawerToggle')}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
            <FontAwesome name="bars" size={28} style={{paddingLeft: 10}}/>
          </Touchable>
        ),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const LoadsStack = StackNavigator(
  {
    CreateLoad: {
      screen: CreateLoad,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: (
          <Touchable
            onPress={() => navigation.navigate('DrawerToggle')}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
            <FontAwesome name="bars" size={28} style={{paddingLeft: 10}}/>
          </Touchable>
        ),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const SettingsStack = StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: (
          <Touchable
            onPress={() => navigation.navigate('DrawerToggle')}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
            <FontAwesome name="bars" size={28} style={{paddingLeft: 10}}/>
          </Touchable>
        ),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  LoadsStack: {
    screen: LoadsStack,
  },
  SettingsStack: {
    screen: SettingsStack,
  },
};

const DefaultStack = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <DefaultDrawer {...props} />,
  drawerWidth: 275,
});

const AdminStack = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <AdminDrawer {...props} />,
  drawerWidth: 275,
});

const DriverStack = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <DriverDrawer {...props} />,
  drawerWidth: 275,
});

const ShipperStack = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <ShipperDrawer {...props} />,
  drawerWidth: 275,
});

export const createRootNavigator = (signedIn = false, userType = 'default') => {

  let userScreen;

  if (userType === 'driver') {
    userScreen = 'Driver'
  } else if (userType === 'shipper') {
    userScreen = 'Shipper'
  } else if (userType === 'admin') {
    userScreen = 'Admin'
  } else {
    userScreen = 'Default'
  }

  return StackNavigator(
    {
      Admin: {screen: AdminStack},
      Driver: {screen: DriverStack},
      Shipper: {screen: ShipperStack},
      Auth: {screen: AuthStack},
      Default: {screen: DefaultStack},
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? userScreen : 'Auth',
    },
  );
};

// export default (Navigator =  StackNavigator(
//   {
//     Main: {screen: DrawerStack},
//     Auth: {screen: AuthStack},
//     // App: {screen:App}
//   },
//   {
//     headerMode: 'none',
//     // initialRouteName: initialRoute,
//   },
// ));
//
