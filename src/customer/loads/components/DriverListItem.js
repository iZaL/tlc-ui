/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import UserInfo from "components/UserInfo";

export default class extends PureComponent {
  static propTypes = {
    driver: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    driver: {},
  };

  render() {
    let {driver,onItemPress} = this.props;
    let {user} = driver;
    return (
      <UserInfo
        style={{padding: 10}}
        image={user.image}
        name={user.name}
        onPress={()=>onItemPress(driver)}
      />
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {},
});
