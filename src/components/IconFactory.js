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

const components = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  // Entypo,
  // FontAwesome
};

class IconFactory extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {type, ...rest} = this.props;
    const Icon = components[type];
    return (
      <View style={styles.container}>
        <Icon color={colors.fadedGrey} {...rest} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default IconFactory;
