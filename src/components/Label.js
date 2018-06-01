import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';

export default class Label extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return false;
  }

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
    fontSize: 12,
    color: colors.mediumGrey,
    fontWeight: '100',
  },
});
