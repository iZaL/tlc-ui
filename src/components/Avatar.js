/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

export default class DrawerIcon extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    size: 100,
  };

  render() {
    let {image, size, style, onPress} = this.props;
    return (
      <TouchableRipple onPress={onPress} underlayColor="transparent">
        <Image
          source={{uri: image}}
          style={[{width: size, height: size, borderRadius: size / 2}, style]}
          resizeMode="contain"
        />
      </TouchableRipple>
    );
  }
}
