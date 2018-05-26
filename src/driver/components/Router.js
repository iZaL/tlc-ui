import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import DrawerIcon from 'components/DrawerIcon';
import Drawer from 'driver/components/Drawer';
import Home from 'driver/Home';
import Settings from 'driver/Settings';
import ProfileHomeScene from 'driver/profile/ProfileHomeScene';
import ProfileUpdateScene from 'driver/profile/ProfileUpdateScene';
import TruckUpdateScene from 'driver/profile/TruckUpdateScene';
import TrailerUpdateScene from 'driver/profile/TrailerUpdateScene';
import RoutesUpdateScene from 'driver/profile/RoutesUpdateScene';
import DocumentsUploadScene from 'driver/profile/DocumentsUploadScene';
import DocumentAddScene from 'driver/trips/DocumentAddScene';
import RoutesDetailScene from 'driver/routes/RoutesDetailScene';
import LoadDetailScene from 'driver/loads/LoadDetailScene';
import LoadListScene from 'driver/loads/LoadListScene';
import LoadHomeScene from 'driver/loads/LoadHomeScene';
import TripTrackScene from 'driver/trips/TripTrackScene';
import NationalityListScene from 'driver/nationality/NationalityListScene';
import NationalityAddScene from 'driver/nationality/NationalityAddScene';
import ProfileInfoUpdateScene from 'driver/profile/ProfileInfoUpdateScene';
import TruckRegistrationScene from 'driver/truck/TruckRegistrationScene';
import TruckModelScene from 'driver/truck/TruckModelScene';
import TruckInfoUpdateScene from 'driver/truck/TruckInfoUpdateScene';
import SecurityPassListScene from 'driver/routes/SecurityPassListScene';
import SecurityPassAddScene from 'driver/routes/SecurityPassAddScene';
import RoutesAddScene from 'driver/routes/RoutesAddScene';

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
        title: I18n.t('home'),
        ...getDrawerIcon(navigation),
      }),
    },
    LoadDetail: {
      screen: LoadDetailScene,
    },
    DocumentAdd: {
      screen: DocumentAddScene,
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.fadedWhite,
    },
    // initialRouteName:'DocumentAdd'
  },
);

const SettingsStack = createStackNavigator(
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
    cardStyle: {
      backgroundColor: colors.fadedWhite,
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfileHome: {
      screen: ProfileHomeScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('profile'),
        ...getDrawerIcon(navigation),
      }),
    },
    ProfileUpdate: {
      screen: ProfileUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('profile_update'),
      }),
    },
    ProfileInfoUpdate: {
      screen: ProfileInfoUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('profile_update'),
      }),
    },
    TruckUpdate: {
      screen: TruckUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('truck_update'),
      }),
    },
    TruckRegistration: {
      screen: TruckRegistrationScene,
      navigationOptions: () => ({
        title: I18n.t('truck_registration'),
      }),
    },
    TruckModel: {
      screen: TruckModelScene,
      navigationOptions: () => ({
        title: I18n.t('truck_model'),
      }),
    },
    TruckInfoUpdate: {
      screen: TruckInfoUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('truck_details'),
      }),
    },
    TrailerUpdate: {
      screen: TrailerUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('trailer_update'),
      }),
    },
    RoutesUpdate: {
      screen: RoutesUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('route_update'),
      }),
    },
    RoutesAdd: {
      screen: RoutesAddScene,
      navigationOptions: () => ({
        title: I18n.t('route_add'),
      }),
    },
    RoutesDetail: {
      screen: RoutesDetailScene,
      navigationOptions: () => ({
        title: I18n.t('route_detail'),
      }),
    },
    DocumentsUpload: {
      screen: DocumentsUploadScene,
      navigationOptions: () => ({
        title: I18n.t('documents_upload'),
      }),
    },
    NationalityList: {
      screen: NationalityListScene,
      navigationOptions: () => ({
        // title: I18n.t('nationality'),
      }),
    },
    NationalityAdd: {
      screen: NationalityAddScene,
      navigationOptions: () => ({
        // title: I18n.t('nationality_add'),
      }),
    },
    SecurityPassList: {
      screen: SecurityPassListScene,
      navigationOptions: () => ({
        title: I18n.t('security_passes'),
      }),
    },
    SecurityPassAdd: {
      screen: SecurityPassAddScene,
      navigationOptions: () => ({
        title: I18n.t('security_passes_add'),
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
    // initialRouteName: 'RoutesAdd',
  },
);

const LoadStack = createStackNavigator(
  {
    LoadStackHome: {
      screen: LoadHomeScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('loads'),
        ...getDrawerIcon(navigation),
      }),
    },
    LoadList: {
      screen: LoadListScene,
    },
    LoadDetail: {
      screen: LoadDetailScene,
    },
    TripTrack: {
      screen: TripTrackScene,
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
  SettingsStack: {
    screen: SettingsStack,
  },
  LoadStack: {
    screen: LoadStack,
  },
};

export const Routes = createDrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  initialRouteName: 'HomeStack',
});
