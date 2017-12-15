/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import Separator from 'components/Separator';
import IconFactory from 'components/IconFactory';
import ListItem from 'components/ListItem';

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
    let {logout} = this.props.screenProps;

    return (
      <View style={styles.container}>
        <DrawerItem
          title={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          icon={
            <IconFactory type="MaterialCommunityIcons" size={30} name="home" />
          }
          active={this.state.activeRoute === 'HomeStack'}
        />

        <Separator />

        <DrawerItem
          title={I18n.t('profile')}
          routeName="ProfileStack"
          onItemPress={this.onItemPress}
          icon={
            <IconFactory type="MaterialCommunityIcons" size={30} name="home" />
          }
          active={this.state.activeRoute === 'ProfileStack'}
        />

        <DrawerItem
          title={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          icon={
            <IconFactory type="MaterialCommunityIcons" size={30} name="home" />
          }
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
