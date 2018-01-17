import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'shipper/components/Drawer';
import Home from 'shipper/Home';
import Settings from 'shipper/Settings';
import DrawerIcon from 'components/DrawerIcon';
import ProfileHome from 'shipper/profile/ProfileHome';
import UpdateProfileScene from 'shipper/profile/UpdateProfileScene';
import ContactsListScene from 'shipper/profile/ContactsListScene';

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  };
};

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => getDrawerIcon(navigation),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

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
  UpdateProfile: {
    screen: UpdateProfileScene,
  },
  ListContacts: {
    screen:ContactsListScene
  }
});


const SettingsStack = StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => getDrawerIcon(navigation),
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
  ProfileStack: {
    screen: ProfileStack,
  },  SettingsStack: {
    screen: SettingsStack,
  },
};

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
