import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'shipper/components/Drawer';
import Home from 'shipper/Home';
import Settings from 'shipper/Settings';
import DrawerIcon from 'components/DrawerIcon';
import ProfileHome from 'shipper/profile/ProfileHome';
import ProfileUpdateScene from 'shipper/profile/ProfileUpdateScene';
import EmployeeListScene from 'shipper/employees/EmployeeListScene';
import EmployeeAddScene from 'shipper/employees/EmployeeAddScene';
import EmployeeEditScene from 'shipper/employees/EmployeeEditScene';
import LoadAddScene from 'shipper/loads/LoadAddScene';
import LocationListScene from 'shipper/locations/LocationListScene';
import LocationAddScene from 'shipper/locations/LocationAddScene';

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
    EmployeeList: {
      screen: EmployeeListScene,
    },
    EmployeeAdd: {
      screen: EmployeeAddScene,
    },
    EmployeeEdit: {
      screen: EmployeeEditScene,
    },
    LoadAdd: {
      screen: LoadAddScene,
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
