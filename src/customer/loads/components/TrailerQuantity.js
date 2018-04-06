import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View, Picker} from 'react-native';
import Modal from 'react-native-modal';
import FormTextInput from 'components/FormTextInput';
import I18n from 'utils/locale';
import {Button} from 'react-native-paper';

export default class TrailerQuantity extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    selected: PropTypes.any,
    // length:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // width:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // height:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // weight:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
    // quantity:PropTypes.oneOfType(PropTypes.number,PropTypes.string),
  };

  render() {
    const {onValueChange, visible, onCancel, onConfirm, selected} = this.props;

    return (
      <View style={{flex: 1, margin: 20, backgroundColor: 'white'}}>
        <Modal
          animationType="slide"
          isVisible={visible}
          transparent={true}
          onBackdropPress={onCancel}>
          <View style={styles.addressContainer}>
            <Picker
              selectedValue={selected}
              onValueChange={(itemValue, itemIndex) =>
                onValueChange(itemValue)
              }>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>

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
