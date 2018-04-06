import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import FormTextInput from 'components/FormTextInput';
import I18n from 'utils/locale';

export default class AddressField extends PureComponent {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
  };

  render() {
    const {address_en, onValueChange} = this.props;

    return (
      <View style={styles.container}>
        {/*<Text style={styles.label}>{I18n.t('address')}</Text>*/}
        <FormTextInput
          onValueChange={onValueChange}
          field={address_en}
          value={address_en}
          maxLength={40}
          keyboardType="numeric"
          style={styles.textInput}
          label={I18n.t('address')}
          numberOfLines={2}
          multiline={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  label: {
    padding: 5,
  },
  textInput: {
    padding: 10,
    height: 50,
    backgroundColor: 'white',
  },
});
