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
import ResidencyListScene from "driver/residency/ResidencyListScene";
import ResidencyEditScene from "driver/residency/ResidencyEditScene";

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
        title: I18n.t('residency_list'),
      }),
    },
    ResidencyEdit: {
      screen: ResidencyEditScene,
      navigationOptions: () => ({
        title: I18n.t('residency_edit'),
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
