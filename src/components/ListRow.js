/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Title, TouchableRipple} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Label from 'components/Label';

export default class ListIRow extends Component {
  static propTypes = {
    left: PropTypes.string.isRequired,
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    icon: null,
  };

  render() {
    let {left, right, onPress} = this.props;
    return (
      <TouchableRipple onPress={onPress}>
        <View style={styles.container}>
          <Label title={left} />
          <Title>{right}</Title>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  left: {},
});
