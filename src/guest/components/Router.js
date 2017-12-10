import React from 'react';
import Login from 'guest/auth/Login';
import Register from 'guest/auth/Register';
import Forgot from 'guest/auth/Forgot';
import OTP from 'guest/auth/OTP';
import Home from 'guest/Home';
import DrawerIcon from 'components/DrawerIcon';
import Drawer from 'guest/components/Drawer';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

export const AuthRoutes = StackNavigator(
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
    },
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
        headerLeft: (
          <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
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
};

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
