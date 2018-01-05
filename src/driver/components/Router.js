import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'driver/components/Drawer';
import DrawerIcon from 'components/DrawerIcon';
import Home from 'driver/Home';
import Settings from 'driver/Settings';
import ProfileHome from 'driver/profile/ProfileHome';
import UpdateProfileScene from 'driver/profile/UpdateProfileScene';
import UpdateTruckScene from 'driver/profile/UpdateTruckScene';
import UpdateTrailerScene from 'driver/profile/UpdateTrailerScene';
import UpdateRoutesScene from 'driver/profile/UpdateRoutesScene';
import UploadDocuments from 'driver/profile/UploadDocuments';
import RoutesDetailScene from 'driver/routes/RoutesDetailScene';
import LoadsDetailScene from "driver/loads/LoadsDetailScene";

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
  LoadsDetail: {
    screen: LoadsDetailScene,
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
  UpdateProfile: {
    screen: UpdateProfileScene,
  },
  UpdateTruck: {
    screen: UpdateTruckScene,
  },
  UpdateTrailer: {
    screen: UpdateTrailerScene,
  },
  UpdateRoutes: {
    screen: UpdateRoutesScene,
  },
  RoutesDetail: {
    screen: RoutesDetailScene,
  },
  UploadDocuments: {
    screen: UploadDocuments,
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
