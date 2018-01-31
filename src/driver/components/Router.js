import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'driver/components/Drawer';
import DrawerIcon from 'components/DrawerIcon';
import Home from 'driver/Home';
import Settings from 'driver/Settings';
import ProfileHomeScene from 'driver/profile/ProfileHomeScene';
import ProfileUpdateScene from 'driver/profile/ProfileUpdateScene';
import TruckUpdateScene from 'driver/profile/TruckUpdateScene';
import TrailerUpdateScene from 'driver/profile/TrailerUpdateScene';
import RoutesUpdateScene from 'driver/profile/RoutesUpdateScene';
import DocumentsUploadScene from 'driver/profile/DocumentsUploadScene';
import RoutesDetailScene from 'driver/routes/RoutesDetailScene';
import LoadDetailScene from 'driver/loads/LoadDetailScene';
import LoadListScene from "driver/loads/LoadListScene";
import LoadHomeScene from "driver/loads/LoadHomeScene";
import TripTrackScene from "driver/trips/TripTrackScene";

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
  LoadDetail: {
    screen: LoadDetailScene,
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
    screen: ProfileHomeScene,
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

const LoadStack = StackNavigator(
  {
    LoadStackHome: {
      screen: LoadHomeScene,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: (
          <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
        ),
      }),
    },
    LoadList: {
      screen: LoadListScene,
    },
    LoadDetail:{
      screen: LoadDetailScene
    },
    TripTrack:{
      screen: TripTrackScene
    }
  },
  {
    // initialRouteName: 'LoadAdd',
  },
);


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
  LoadStack:{
    screen: LoadStack
  }
};

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  initialRouteName: 'LoadStack',
});
