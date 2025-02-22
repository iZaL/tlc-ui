import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'components/Modal';
import TextInput from 'components/TextInput';
import I18n from 'utils/locale';
import {Title} from 'react-native-paper';
import AlbumUpload from 'components/AlbumUpload';
import IconFactory from 'components/IconFactory';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import Button  from 'components/Button';

export default class PackageDimensions extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    uploadPackagingImages: PropTypes.func.isRequired,
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
      uploadPackagingImages,
      packaging_images,
    } = this.props;

    return (
      <View style={{flex: 1, margin: 20, backgroundColor: 'white'}}>
        <Modal
          animationType="slide"
          visible={visible}
          transparent={true}
          onBackdropPress={onCancel}
          onCancel={onCancel}
          hideButton={true}
          header="Package Dimensions"
        >
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

            <Divider style={{marginVertical: 20}} />

            <AlbumUpload
              images={packaging_images}
              onUpload={uploadPackagingImages}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title style={{textAlign: 'center'}}>
                  {I18n.t('upload_images')}
                </Title>
                <IconFactory
                  type="MaterialIcons"
                  name="add-a-photo"
                  size={40}
                  color={colors.darkGrey}
                />
              </View>
            </AlbumUpload>

            <Divider style={{marginVertical: 20}} />

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
    padding: 10,
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
