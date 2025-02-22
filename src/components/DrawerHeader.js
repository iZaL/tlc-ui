/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Title} from 'react-native-paper';

export default class DrawerHeader extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
    }).isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {user} = this.props;
    return (
      <View style={styles.container}>
        <Title style={{color: colors.fadedWhite}}>{user.name}</Title>
        <Paragraph style={{color: colors.fadedWhite}}>{user.email}</Paragraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: 30,
  },
});
