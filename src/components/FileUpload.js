/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import map from 'lodash/map';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
export default class FileUpload extends Component {
  static propTypes = {
    onUpload: PropTypes.func,
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
  };

  uploadFile = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
    },(error,res) => {
      // Android
      console.log(
        res.uri,
        res.type, // mime type
        res.fileName,
        res.fileSize
      );

      this.props.onUpload(res);
    });
  };

  render() {
    return (
      <TouchableRipple onPress={this.uploadFile} underlayColor="transparent">
        {this.props.children}
      </TouchableRipple>
    );
  }
}
