import React, {Component} from 'react';
import {StyleSheet, TextInput, Platform} from 'react-native';
import colors from 'theme/colors';
import {isRTL} from 'utils/locale';

export default class FormTextInput extends Component {
  static propTypes = {
    // style:PropTypes.object
  };

  render() {
    const {style, ...rest} = this.props;
    return (
      <TextInput
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor={colors.mediumGrey}
        autoCorrect={false}
        autoCapitalize="none"
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: Platform.OS === 'ios' ? colors.lightGrey : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
    fontSize: 18,
    color: 'black',
    fontWeight: '300',
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 25,
  },
});
