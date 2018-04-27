import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';

export default class FormLabel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // style:PropTypes.object
  };

  render() {
    const {title, style} = this.props;
    return (
      <Text {...this.props} style={[styles.label, style]}>
        {title}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: 13,
    color: colors.mediumGrey,
    fontWeight: '700',
  },
});
