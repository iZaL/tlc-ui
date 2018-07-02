import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import TextInput from 'components/TextInput';
import I18n from 'utils/locale';

export default class AddressFormFields extends PureComponent {
  static propTypes = {
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    updateFields: PropTypes.func.isRequired,
  };

  render() {
    console.log('rendering address');
    const {address, city, state, updateFields} = this.props;

    return (
      <View style={styles.addressContainer}>
        <View style={styles.addressField}>
          <TextInput
            onValueChange={updateFields}
            value={address}
            field="address"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('address')}
          />
        </View>

        <View style={[styles.addressField]}>
          <TextInput
            onValueChange={updateFields}
            value={city}
            field="city"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('city')}
            multiline
          />
        </View>

        <View style={styles.addressField}>
          <TextInput
            onValueChange={updateFields}
            value={state}
            field="state"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('state')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
  addressContainer: {
    // flexDirection: 'row',
  },
  addressField: {
    paddingHorizontal: 5,
    marginHorizontal: 1,
  },
  textInput: {},
});
