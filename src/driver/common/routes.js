import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {Drawer} from 'driver/components/Drawer';
import Home from 'driver/Home';
import Settings from 'driver/Settings';
import Profile from 'driver/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import DrawerIcon from "components/DrawerIcon";

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: (
          <DrawerIcon onPress={()=>navigation.navigate('DrawerToggle')} />
        ),
      }),
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
          <DrawerIcon onPress={()=>navigation.navigate('DrawerToggle')} />
        ),
      }),
    },
  },
);

const ProfileStack = StackNavigator(
  {
    Settings: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: (
          <DrawerIcon onPress={()=>navigation.navigate('DrawerToggle')} />
        ),
      }),
    },
  },
);

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  ProfileStack: {
    screen: ProfileStack
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
