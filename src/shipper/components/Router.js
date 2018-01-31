import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'shipper/components/Drawer';
import Home from 'shipper/Home';
import Settings from 'shipper/Settings';
import DrawerIcon from 'components/DrawerIcon';
import ProfileHomeScene from 'shipper/profile/ProfileHomeScene';
import ProfileUpdateScene from 'shipper/profile/ProfileUpdateScene';
import EmployeeListScene from 'shipper/employees/EmployeeListScene';
import EmployeeAddScene from 'shipper/employees/EmployeeAddScene';
import EmployeeEditScene from 'shipper/employees/EmployeeEditScene';
import LoadAddScene from 'shipper/loads/LoadAddScene';
import LocationListScene from 'shipper/locations/LocationListScene';
import LocationAddScene from 'shipper/locations/LocationAddScene';
import LoadListScene from "shipper/loads/LoadListScene";
import LoadHomeScene from "shipper/loads/LoadHomeScene";
import LoadDetailScene from "shipper/loads/LoadDetailScene";
import TripTrackScene from "shipper/trips/TripTrackScene";

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

const ProfileStack = StackNavigator(
  {
    ProfileStackHome: {
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
    EmployeeList: {
      screen: EmployeeListScene,
    },
    EmployeeAdd: {
      screen: EmployeeAddScene,
    },
    EmployeeEdit: {
      screen: EmployeeEditScene,
    },
    LocationList: {
      screen: LocationListScene,
    },
    LocationAdd: {
      screen: LocationAddScene,
    },
  },
  {
    // initialRouteName: 'LoadAdd',
  },
);
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
    LoadAdd: {
      screen: LoadAddScene,
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

const SettingStack = StackNavigator(
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
  },
  SettingStack: {
    screen: SettingStack,
  },
  LoadStack: {
    screen: LoadStack,
  },
};

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  initialRouteName: 'LoadStack',
});
