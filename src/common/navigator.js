import React from 'react';
import Login from 'auth/Login';
import Register from 'auth/Register';
import Forgot from 'auth/Forgot';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'components/Drawer';
import Home from 'home/Home';
import Settings from 'home/Settings';
import CreateOrder from 'orders/CreateOrder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';

const AuthStack = StackNavigator(
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
    CreateOrder: {screen: CreateOrder},
    Settings: {screen: Settings},
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const CreateOrderStack = StackNavigator(
  {
    CreateOrder: {
      screen: CreateOrder,
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
    Home: {screen: Home},
    Settings: {screen: Settings},
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
            <FontAwesome name="bars" size={28} style={{paddingLeft: 10}} />
          </Touchable>
        ),
      }),
    },
    Home: {screen: Home},
    CreateOrder: {screen: CreateOrder},
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
  CreateOrderStack: {
    screen: CreateOrderStack,
  },
  SettingsStack: {
    screen: SettingsStack,
  },
};

const DrawerStack = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  initialRouteName: 'CreateOrderStack',
});

export default (Navigator = StackNavigator(
  {
    Main: {screen: DrawerStack},
    Auth: {screen: AuthStack},
  },
  {
    headerMode: 'none',
    // initialRouteName: 'Auth',
  },
));
