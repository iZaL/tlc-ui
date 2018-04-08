import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';

export default class Button extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.title !== this.props.title
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    background: PropTypes.string,
  };

  static defaultProps = {
    background: 'primary',
  };

  render() {
    const {
      style,
      background,
      title,
      titleStyle,
      disabled,
      ...rest
    } = this.props;

    return (
      <Touchable
        {...rest}
        disabled={disabled}
        style={[
          styles.button,
          style,
          disabled && {opacity: 0.4},
          background !== 'primary' && {backgroundColor: colors[background]},
        ]}>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 20,
    // height: 40,
    width: 350,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
});
