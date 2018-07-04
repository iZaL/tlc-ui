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
      <View style={styles.container}>
        <TouchableRipple onPress={() => onItemPress(item)}>
          <UserInfo
            image={driver.user.image}
            name={driver.user.name}
            onAvatarPress={this.onPress}
          />
        </TouchableRipple>

        <TouchableRipple
          onPress={() => onItemPress(item)}
          underlayColor="transparent">
          <View style={styles.rightContainer}>
            <Label title={I18n.t('status')} />
            <Text style={[styles.status]}>{item.status_formatted}</Text>
          </View>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap:'wrap',
    padding:10
  },
  avatar: {
    height: 40,
    width: 40,
  },
  status: {},
  rightContainer: {
    // alignItems:'flex-end',
    // justifyContent:'center',
    // flexDirection:'row',
    // paddingHorizontal: 10,
  },
});
