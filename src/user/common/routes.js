import React from 'react';
import Login from 'user/Login';
import Register from 'user/Register';
import Forgot from 'user/Forgot';
import OTP from 'user/OTP';
import Home from 'user/Home';
import DrawerIcon from 'components/DrawerIcon';
import Drawer from 'user/components/Drawer';
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
