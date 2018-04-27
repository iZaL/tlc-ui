/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import ListItem from 'components/ListItem';
import {TripProp} from 'app/common/proptypes';

export default class extends PureComponent {
  static propTypes = {
    item: TripProp.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    item: [],
  };

  render() {
    let {item, onItemPress} = this.props;
    console.log('item',item);
    return (
      <TouchableRipple onItemPress={onItemPress}>
        <View style={styles.container}>
          <ListItem
            onItemPress={onItemPress}
            title={item.driver.user.name}
            description={item.driver.nationalities.map(nationality => nationality.country.name).join(',')}
            avatar={
              <Image
                source={{uri: 'https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-coder-3579ca3abc3fd60f-512x512.png'}}
                style={styles.avatar}
              />
            }
            style={{flex: 1}}
          />
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
  },
  status: {
    paddingHorizontal: 10
  }
});
