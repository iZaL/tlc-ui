import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'driver/components/Drawer';
import DrawerIcon from 'components/DrawerIcon';
import Home from 'driver/Home';
import Settings from 'driver/Settings';
import ProfileHome from 'driver/profile/ProfileHome';
import UpdateProfile from "driver/profile/UpdateProfile";

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
});

const ProfileStack = StackNavigator({
  Settings: {
    screen: ProfileHome,
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
  UpdateProfile:{
    screen: UpdateProfile
  }
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  ProfileStack: {
    screen: ProfileStack,
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
