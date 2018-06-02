import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'components/Modal';
import TextInput from 'components/TextInput';
import I18n from 'utils/locale';
import {Button} from 'react-native-paper';

export default class PackageDimensions extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    // length:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // width:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // height:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // weight:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // quantity:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
  };

  render() {
    const {
      onValueChange,
      visible,
      onCancel,
      onConfirm,
      height,
      weight,
      length,
      quantity,
      width,
    } = this.props;

    return (
      <View style={{flex: 1, margin: 20, backgroundColor: 'white'}}>
        <Modal
          animationType="slide"
          visible={visible}
          transparent={true}
          onBackdropPress={onCancel}>
          <View style={styles.addressContainer}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                onValueChange={onValueChange}
                value={length}
                field="length"
                maxLength={40}
                keyboardType="numeric"
                autoFocus={false}
                style={styles.textInput}
                label={`${I18n.t('length')} ${I18n.t('m')}`}
              />

              <TextInput
                onValueChange={onValueChange}
                field="width"
                value={width}
                maxLength={40}
                keyboardType="numeric"
                autoFocus={false}
                style={styles.textInput}
                label={`${I18n.t('width')} ${I18n.t('m')}`}
              />

              <TextInput
                onValueChange={onValueChange}
                field="height"
                value={height}
                maxLength={40}
                keyboardType="numeric"
                autoFocus={false}
                style={styles.textInput}
                label={`${I18n.t('height')} ${I18n.t('m')}`}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <TextInput
                onValueChange={onValueChange}
                field="weight"
                value={weight}
                maxLength={40}
                keyboardType="numeric"
                autoFocus={false}
                style={styles.textInput}
                label={`${I18n.t('weight')} ${I18n.t('tons')}`}
              />

              <TextInput
                onValueChange={onValueChange}
                field="quantity"
                value={quantity}
                maxLength={40}
                keyboardType="numeric"
                autoFocus={false}
                style={styles.textInput}
                label={`${I18n.t('quantity')}`}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button raised onPress={onCancel}>
                {I18n.t('close')}
              </Button>
              <Button raised primary onPress={onConfirm}>
                {I18n.t('save')}
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    // textAlign: 'center',
  },
  addressContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  addressField: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    // textAlign: 'center',
    marginHorizontal: 2,
  },
});
