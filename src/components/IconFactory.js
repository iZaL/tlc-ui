/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from "assets/theme/colors";

const components = {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome
};

const IconFactory = ({type,...rest}) => {
  const Icon = components[type];
  return <Icon color={colors.fadedGrey} {...rest} />;
};

IconFactory.propTypes = {
  type:PropTypes.string.isRequired,
};

export default IconFactory;
