import React from 'react';
import Login from 'guest/auth/Login';
import Register from 'guest/auth/Register';
import Forgot from 'guest/auth/Forgot';
import OTP from 'guest/auth/OTP';
import Home from 'guest/Home';
import DrawerIcon from 'components/DrawerIcon';
import Drawer from 'guest/components/Drawer';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export const AuthRoutes = StackNavigator(
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
