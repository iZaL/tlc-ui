import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Label from 'components/Label';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

export default class OTPScene extends Component {
  static propTypes = {
    onButtonPress: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    resendCode: PropTypes.func.isRequired,
  };

  render() {
    const {code, onButtonPress, onValueChange, resendCode} = this.props;

    return (
      <View style={styles.container}>
        <Label title={I18n.t('confirmation_code')} />

        <TextInput
          onValueChange={onValueChange}
          field="code"
          value={code}
          maxLength={40}
          label={I18n.t('confirmation_code')}
        />

        <Button
          onPress={() => onButtonPress()}
          underlayColor="transparent"
          disabled={!code}
          title={I18n.t('confirm')}
          style={{marginTop: 50}}
        />

        <TouchableHighlight
          onPress={() => resendCode()}
          style={[{paddingTop: 100}]}
          underlayColor="transparent">
          <Text style={[styles.link]}>
            {I18n.t('resend_confirmation_code')}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
  },
  link: {
    marginTop: 20,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
