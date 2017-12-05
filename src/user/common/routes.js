import React from 'react';
import Login from 'user/Login';
import Register from 'user/Register';
import Forgot from 'user/Forgot';
import OTP from 'user/OTP';
import {Drawer} from 'user/components/Drawer';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Home from 'user/Home';
import Touchable from 'react-native-platform-touchable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        gesturesEnabled: false,
        headerLeft: (
          <Touchable
            onPress={() => navigation.navigate('DrawerToggle')}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
            <FontAwesome name="bars" size={28} style={{paddingLeft: 10}} />
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
};

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
