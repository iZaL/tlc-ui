/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import Divider from 'components/Divider';
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
          active={activeRoute === 'Logout'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
