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
import LoadListScene from 'driver/loads/LoadListScene';
import LoadHomeScene from 'driver/loads/LoadHomeScene';
import TripTrackScene from 'driver/trips/TripTrackScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import NationalityListScene from 'driver/nationality/NationalityListScene';
import NationalityAddScene from 'driver/nationality/NationalityAddScene';
import ProfileInfoUpdateScene from 'driver/profile/ProfileInfoUpdateScene';
import TruckRegistrationScene from 'driver/truck/TruckRegistrationScene';
import TruckModelScene from 'driver/truck/TruckModelScene';
import TruckInfoUpdateScene from 'driver/truck/TruckInfoUpdateScene';
import SecurityPassListScene from 'driver/routes/SecurityPassListScene';
import SecurityPassAddScene from 'driver/routes/SecurityPassAddScene';
import RoutesAddScene from "driver/routes/RoutesAddScene";

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
    navigationOptions: ({navigation}) => ({
      title: I18n.t('home'),
      ...getDrawerIcon(navigation),
    }),
  },
  LoadDetail: {
    screen: LoadDetailScene,
  },
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('settings'),
      ...getDrawerIcon(navigation),
    }),
  },
});

const ProfileStack = StackNavigator(
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
    initialRouteName: 'RoutesAdd',
  },
);

const LoadStack = StackNavigator(
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

export const Routes = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  initialRouteName: 'ProfileStack',
});
