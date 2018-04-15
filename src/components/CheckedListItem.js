/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import {Checkbox} from 'react-native-paper';

export default class CheckedListItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    let {title, disabled, onPress, checked, style} = this.props;
    return (
      <Touchable onPress={onPress}>
        <View
          style={[styles.itemRowContainer, style, disabled && {opacity: 0.4}]}>
            <Text style={styles.itemTitle}>{title}</Text>
          <Checkbox checked={checked} color={colors.primary} />
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
