/**
 * @flow
 */
import React, {Component} from 'react';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import {DrawerSection} from 'react-native-paper';
import DrawerHeader from 'components/DrawerHeader';

export default class Drawer extends Component {
  onItemPress = (routeName: string) => {
    this.setState({
      activeRoute: routeName,
    });
    this.props.navigation.navigate(routeName);
  };

  state = {
    activeRoute: 'HomeStack',
  };

  render() {
    let {logout, user} = this.props.screenProps;
    let {activeRoute} = this.state;

    return (
      <DrawerSection>
        <DrawerHeader user={user} />

        <DrawerItem
          label={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'home-outline',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'HomeStack'}
        />

        <DrawerItem
          label={I18n.t('profile')}
          routeName="ProfileStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'person-outline',
            type: 'MaterialIcons',
          }}
          active={activeRoute === 'ProfileStack'}
        />

        <DrawerItem
          label={I18n.t('loads')}
          routeName="LoadStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'truck-delivery',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'LoadStack'}
        />

        <DrawerItem
          label={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          iconProps={{
            name: 'logout',
            type: 'MaterialCommunityIcons',
          }}
          active={this.state.activeRoute === 'Logout'}
        />
      </DrawerSection>
    );
  }
}
