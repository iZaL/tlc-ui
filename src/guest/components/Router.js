import React from 'react';
import Login from 'guest/auth/Login';
import Register from 'guest/auth/Register';
import Forgot from 'guest/auth/Forgot';
import OTP from 'guest/auth/OTP';
import Home from 'guest/Home';
import DrawerIcon from 'components/DrawerIcon';
import Drawer from 'guest/components/Drawer';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export const AuthRoutes = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    RegisterScreen: {
      screen: Register,
      navigationOptions: () => ({
        title: I18n.t('register'),
      }),
    },
    ForgotScreen: {
      screen: Forgot,
      navigationOptions: () => ({
        title: I18n.t('forgot_password'),
      }),
    },
    OTPScreen: {
      screen: OTP,
      navigationOptions: () => ({
        title: I18n.t('confirm'),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
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

export const Routes = createDrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
