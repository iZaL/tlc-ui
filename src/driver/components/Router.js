import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'driver/components/Drawer';
import DrawerIcon from 'components/DrawerIcon';
import Home from 'driver/Home';
import Settings from 'driver/Settings';
import ProfileHome from 'driver/profile/ProfileHome';
import ProfileUpdateScene from 'driver/profile/ProfileUpdateScene';
import TruckUpdateScene from 'driver/profile/TruckUpdateScene';
import TrailerUpdateScene from 'driver/profile/TrailerUpdateScene';
import RoutesUpdateScene from 'driver/profile/RoutesUpdateScene';
import DocumentsUploadScene from 'driver/profile/DocumentsUploadScene';
import RoutesDetailScene from 'driver/routes/RoutesDetailScene';
import LoadsDetailScene from 'driver/loads/LoadsDetailScene';

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  };
};

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
  LoadsDetail: {
    screen: LoadsDetailScene,
  },
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
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
  ProfileUpdate: {
    screen: ProfileUpdateScene,
  },
  TruckUpdate: {
    screen: TruckUpdateScene,
  },
  TrailerUpdate: {
    screen: TrailerUpdateScene,
  },
  RoutesUpdate: {
    screen: RoutesUpdateScene,
  },
  RoutesDetail: {
    screen: RoutesDetailScene,
  },
  DocumentsUpload: {
    screen: DocumentsUploadScene,
  },
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
  // initialRouteName: 'ProfileStack',
});
