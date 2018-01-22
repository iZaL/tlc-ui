import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import FormTextInput from 'components/FormTextInput';
import I18n from 'utils/locale';

export default class AddressField extends PureComponent {
  static propTypes = {
    updateFields: PropTypes.func.isRequired,
  };

  render() {
    const {address_en, updateFields} = this.props;

    return (
      <View style={styles.container}>
        {/*<Text style={styles.label}>{I18n.t('address')}</Text>*/}
        <FormTextInput
          onChangeText={value => updateFields('address_en', value)}
          value={address_en}
          maxLength={40}
          keyboardType="numeric"
          style={styles.textInput}
          placeholder={I18n.t('address')}
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
