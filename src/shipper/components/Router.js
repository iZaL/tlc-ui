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
import LoadListScene from 'shipper/loads/LoadListScene';
import LoadHomeScene from 'shipper/loads/LoadHomeScene';
import LoadDetailScene from 'shipper/loads/LoadDetailScene';
import TripTrackScene from 'shipper/trips/TripTrackScene';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import LoadDetailOptionsListScene from "shipper/loads/LoadDetailOptionsListScene";

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
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: 'Home',
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
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
        title: I18n.t('profile'),
      }),
    },
    ProfileUpdate: {
      screen: ProfileUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('profile_update'),
      }),
    },
    EmployeeList: {
      screen: EmployeeListScene,
      navigationOptions: () => ({
        title: I18n.t('employee_list'),
      }),
    },
    EmployeeAdd: {
      screen: EmployeeAddScene,
      navigationOptions: () => ({
        title: I18n.t('employee_add'),
      }),
    },
    EmployeeEdit: {
      screen: EmployeeEditScene,
      navigationOptions: () => ({
        title: I18n.t('employee_edit'),
      }),
    },
    LocationList: {
      screen: LocationListScene,
    },
    LocationAdd: {
      screen: LocationAddScene,
      navigationOptions: () => ({
        title: I18n.t('location_add'),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    },
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
        title: I18n.t('loads'),
      }),
    },
    LoadList: {
      screen: LoadListScene,
    },
    LoadAdd: {
      screen: LoadAddScene,
      navigationOptions: () => ({
        title: I18n.t('load_add'),
      }),
    },
    LoadDetailOptionsList:{
      screen: LoadDetailOptionsListScene,
      navigationOptions: () => ({
        title: I18n.t('load_detail_options_list'),
      }),
    },
    LoadDetail: {
      screen: LoadDetailScene,
      navigationOptions: () => ({
        title: I18n.t('load_detail'),
      }),
    },
    TripTrack: {
      screen: TripTrackScene,
      navigationOptions: () => ({
        title: I18n.t('trip_track'),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    },
    // initialRouteName: 'LoadAdd',
  },
);

const SettingStack = StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('settings'),
        ...getDrawerIcon(navigation),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
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
  // initialRouteName: 'LoadStack',
});
