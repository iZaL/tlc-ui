/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'assets/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const components = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
  // FontAwesome
};

class IconFactory extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    size:24
  };

  render() {
    let {type, style, color, size, ...rest} = this.props;
    const Icon = components[type];
    return (
        <Icon color={color ? colors.fadedGrey : color} style={[styles.icon,style]} size={size} {...rest}  />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    width:24,
    height:24
  }
});

export default IconFactory;
