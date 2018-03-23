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

export default class Drawer extends Component {
  state = {
    activeRoute: 'HomeStack',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activeRoute !== nextState.activeRoute;
  }

  onItemPress = (routeName: string) => {
    this.setState({
      activeRoute: routeName,
    });
    this.props.navigation.navigate(routeName);
  };

  render() {
    let {logout} = this.props.screenProps;

    let {activeRoute} = this.state;

    return (
      <View style={styles.container}>
        <DrawerItem
          title={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'home-outline',
            type: 'MaterialCommunityIcons',
            size: 30,
          }}
          active={activeRoute === 'HomeStack'}
        />

        <Separator style={{marginVertical:10}} />

        <DrawerItem
          title={I18n.t('profile')}
          routeName="ProfileStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'person-outline',
            type: 'MaterialIcons',
            size: 32,
          }}
          active={activeRoute === 'ProfileStack'}
        />

        <Separator style={{marginVertical:10}} />
        <DrawerItem
          title={I18n.t('loads')}
          routeName="LoadStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'truck-delivery',
            type: 'MaterialCommunityIcons',
            size: 32,
          }}
          active={activeRoute === 'LoadStack'}
        />

        <Separator style={{marginVertical:10}} />

        <DrawerItem
          title={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          iconProps={{
            name: 'logout',
            type: 'MaterialCommunityIcons',
            size: 28,
            paddingLeft: 5,
          }}
          active={activeRoute === 'Logout'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fadedWhite,
    paddingTop: 30,
  },
});
