import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {Drawer} from 'admin/components/Drawer';
import Home from 'admin/Home';
import Settings from 'admin/Settings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';

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
  SettingsStack: {
    screen: SettingsStack,
  },
};

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
