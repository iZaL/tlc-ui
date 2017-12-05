/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Touchable} from 'react-native';
import {NavigationActions} from 'react-navigation';
import colors from 'assets/theme/colors';
import I18n from 'common/locale';
import DrawerItem from 'components/DrawerItem';
import Separator from 'components/Separator';

export class Drawer extends Component {
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
    let {logout} = this.props.screenProps;

    return (
      <View style={styles.container}>
        <DrawerItem
          title={I18n.t('shipper_home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          icon="ios-paper-plane"
          active={this.state.activeRoute === 'HomeStack'}
        />

        <Separator />

        <DrawerItem
          title={I18n.t('settings')}
          routeName="SettingsStack"
          onItemPress={this.onItemPress}
          icon="ios-paper-plane"
          active={this.state.activeRoute === 'SettingsStack'}
        />

        <Separator />

        <DrawerItem
          title={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          icon="ios-paper-plane"
          active={this.state.activeRoute === 'Logout'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fadedWhite,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
});
