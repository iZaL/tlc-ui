/**
 * @flow
 */
import React, {PureComponent,Component} from 'react';
import PropTypes from 'prop-types';
import {Picker, StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';

export default class Dropdown extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    selectedValue: PropTypes.number,
    items: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired
  };

  render() {
    let {selectedValue, field, items, onClose, onItemPress} = this.props;

    return (
      <View style={styles.container}>
        <Text onPress={onClose}>{I18n.t('close')}</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onItemPress(field, itemValue)}>

          <Picker.Item label={I18n.t('select')} value='' />

          {
            items.map(item => {
                return (
                  <Picker.Item label={item.name_en} value={item.id} key={item.id}/>
                )
              }
            )
          }

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
