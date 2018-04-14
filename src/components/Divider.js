import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from 'theme/colors';
import {Divider as PaperDivider} from 'react-native-paper';

class Divider extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {style} = this.props;
    return <PaperDivider style={[styles.container, style]} />;
  }
}

Divider.propTyes = {
  style: PropTypes.style,
};

const styles = StyleSheet.create({
  // container: {
  //   height: 0.5,
  //   backgroundColor: colors.lightGrey,
  // },
});

export default Divider;
