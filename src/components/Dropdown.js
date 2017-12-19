/**
 * @flow
 */
import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {Platform,Picker, StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';

export default class Dropdown extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    selectedValue: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    items: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
  };

  render() {
    let {selectedValue, field, items, onClose, onItemPress} = this.props;

    return (
      <View style={styles.container}>

        {
          Platform.OS === 'ios' &&
          <Text onPress={() => onClose(false, field)}>{I18n.t('close')}</Text>

        }

        <Picker
          selectedValue={selectedValue}
          onValueChange={itemValue => onItemPress(field, itemValue)}>
          <Picker.Item label={I18n.t('select')} value="" />

          {items.map(item => {
            return typeof item === 'object' ? <Picker.Item label={item.name_en} value={item.id} key={item.id} /> : <Picker.Item label={item} value={item} key={item} />
          })}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.fadedWhite,
    // paddingHorizontal: 10,
    // paddingTop: 30,
  },
});
