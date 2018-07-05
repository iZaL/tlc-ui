import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Settings from 'customer/Settings';
import DrawerIcon from 'components/DrawerIcon';
import ProfileHomeScene from 'customer/profile/ProfileHomeScene';
import ProfileUpdateScene from 'customer/profile/ProfileUpdateScene';
import EmployeeListScene from 'customer/employees/EmployeeListScene';
import EmployeeAddScene from 'customer/employees/EmployeeAddScene';
import LoadAddScene from 'customer/loads/LoadAddScene';
import LocationListScene from 'customer/locations/LocationListScene';
import LocationAddScene from 'customer/locations/LocationAddScene';
import LoadListScene from 'customer/loads/LoadListScene';
import LoadHomeScene from 'customer/loads/LoadHomeScene';
import LoadDetailScene from 'customer/loads/LoadDetailScene';
import TripTrackScene from 'customer/trips/TripTrackScene';
import LoadDetailOptionsListScene from 'customer/loads/LoadDetailOptionsListScene';
import DriversListScene from 'customer/loads/DriversListScene';
import DriversBlockListScene from 'customer/profile/DriversBlockListScene';
import TripDetailScene from 'customer/trips/TripDetailScene';
import LanguageSelect from 'app/LanguageSelect';
import LocationEditScene from 'customer/locations/LocationEditScene';
import BookableDriversListScene from "customer/loads/BookableDriversListScene";
import DriverSelect from "customer/trips/DriverSelect";

const getDrawerIcon = navigation => {
  return {
    headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
  };
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: 'Home',
      }),
    },
    LanguageSelect: {
      screen: LanguageSelect,
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    },
    cardStyle: {
      backgroundColor: colors.fadedWhite,
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfileStackHome: {
      screen: ProfileHomeScene,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
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
    LocationEdit: {
      screen: LocationEditScene,
    },
    DriversBlockList: {
      screen: DriversBlockListScene,
      navigationOptions: () => ({
        title: I18n.t('blocked_drivers'),
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    },
    cardStyle: {
      backgroundColor: colors.fadedWhite,
    },
    // initialRouteName: 'LocationList',
  },
);
const LoadStack = createStackNavigator(
  {
    LoadStackHome: {
      screen: LoadHomeScene,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
        headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
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
    LoadDetailOptionsList: {
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
    TripDetail: {
      screen: TripDetailScene,
      navigationOptions: () => ({
        title: I18n.t('trip_detail'),
      }),
    },
    TripTrack: {
      screen: TripTrackScene,
      navigationOptions: () => ({
        title: I18n.t('trip_track'),
      }),
    },
    DriverSelect: {
      screen: DriverSelect,
      navigationOptions: () => ({
        title: I18n.t('driver_select'),
      }),
    },
    DriversList: {
      screen: DriversListScene,
    },
    BookableDrivers: {
      screen: BookableDriversListScene,
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    },
    cardStyle: {
      backgroundColor: colors.fadedWhite,
    },
    // initialRouteName: 'LoadDetail',
  },
);

const SettingStack = createStackNavigator(
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
    cardStyle: {
      backgroundColor: colors.fadedWhite,
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

export const Routes = createDrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  // initialRouteName: 'LoadStack',
});
