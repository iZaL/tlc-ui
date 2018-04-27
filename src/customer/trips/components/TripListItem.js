/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {TripProp} from 'app/common/proptypes';
import Label from 'components/Label';
import I18n from 'utils/locale';
import UserInfo from 'components/UserInfo';

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
    let {driver} = item;
    return (
      <TouchableRipple onPress={()=>onItemPress(item)}>
        <View style={styles.container}>
          <UserInfo
            style={{padding: 10}}
            image={driver.user.image}
            name={driver.user.name}
            onAvatarPress={this.onPress}
          />

          <View style={styles.rightContainer}>
            <Label title={I18n.t('status')} />
            <Text style={styles.status}>{item.status}</Text>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
  },
  status: {},
  rightContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
