import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Drawer from 'admin/components/Drawer';
import Home from 'admin/Home';
import Settings from 'admin/Settings';
import DrawerIcon from 'components/DrawerIcon';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
    }),
  },
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
    }),
  },
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  SettingsStack: {
    screen: SettingsStack,
  },
};

export const Routes = createDrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
