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
import ResidencyListScene from 'driver/residence/ResidencyListScene';
import ResidencyEditScene from 'driver/residence/ResidencyEditScene';
import ResidencyAddScene from 'driver/residence/ResidencyAddScene';
import LicenseListScene from 'driver/license/LicenseListScene';
import LicenseEditScene from 'driver/license/LicenseEditScene';
import LicenseAddScene from 'driver/license/LicenseAddScene';
import NationalityListScene from 'driver/nationality/NationalityListScene';
import NationalityEditScene from 'driver/nationality/NationalityEditScene';
import NationalityAddScene from 'driver/nationality/NationalityAddScene';

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
    Settings: {
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
    TruckUpdate: {
      screen: TruckUpdateScene,
      navigationOptions: () => ({
        title: I18n.t('truck_update'),
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
    ResidencyList: {
      screen: ResidencyListScene,
      navigationOptions: () => ({
        title: I18n.t('residence'),
      }),
    },
    ResidencyEdit: {
      screen: ResidencyEditScene,
      navigationOptions: () => ({
        title: I18n.t('residency_edit'),
      }),
    },
    ResidencyAdd: {
      screen: ResidencyAddScene,
      navigationOptions: () => ({
        title: I18n.t('residency_add'),
      }),
    },
    LicenseList: {
      screen: LicenseListScene,
      navigationOptions: () => ({
        title: I18n.t('license'),
      }),
    },
    LicenseEdit: {
      screen: LicenseEditScene,
      navigationOptions: () => ({
        title: I18n.t('license_edit'),
      }),
    },
    LicenseAdd: {
      screen:LicenseAddScene,
      navigationOptions: () => ({
        title: I18n.t('license_add'),
      }),
    },
    NationalityList: {
      screen: NationalityListScene,
      navigationOptions: () => ({
        title: I18n.t('nationality'),
      }),
    },
    NationalityEdit: {
      screen: NationalityEditScene,
      navigationOptions: () => ({
        title: I18n.t('nationality_edit'),
      }),
    },
    NationalityAdd: {
      screen:NationalityAddScene,
      navigationOptions: () => ({
        title: I18n.t('nationality_add'),
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
