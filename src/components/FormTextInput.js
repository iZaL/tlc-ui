import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';

export default class FormTextInput extends Component {

  static propTypes = {
    field:PropTypes.string.isRequired,
    onChangeText:PropTypes.func.isRequired
  };

  onChangeText = (value) => {
    let {field,onChangeText} = this.props;
    onChangeText(field,value);
  };

  render() {
    const {style, placeholder, ...rest} = this.props;
    return (
      <TextInput
        onChangeText={this.onChangeText}
        label={placeholder}
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
