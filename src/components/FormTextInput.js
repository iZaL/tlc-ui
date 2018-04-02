import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import colors from 'theme/colors';
import {isRTL} from 'utils/locale';
import {TextInput} from 'react-native-paper';

export default class FormTextInput extends Component {
  static propTypes = {
    // style:PropTypes.object
  };

  render() {
    const {style, placeholder, ...rest} = this.props;
    return (
      <TextInput
        label={placeholder}
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor={colors.mediumGrey}
        autoCorrect={false}
        autoCapitalize="none"
        underlineColor={colors.primary}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
