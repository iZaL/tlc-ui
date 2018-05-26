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

export default class AlbumUpload extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onUpload: PropTypes.func,
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    max: 5,
  };

  uploadImages = () => {
    const uploadedImages = this.props.images;
    const maxImages = this.props.max;

    ImagePicker.openPicker({
      multiple: true,
    })
      .then(collection => {
        return map(collection, image => image.path);
      })
      .then(images => {
        if (uploadedImages.length >= maxImages) return;
        let allowedImages = [];
        let i = 1;
        images.forEach(image => {
          if (i + uploadedImages.length <= maxImages) {
            allowedImages.push(image);
          }
          i++;
        });
        return allowedImages;
      })
      .then(pendingImages => this.props.onUpload(pendingImages))
      .catch(e => {});
  };

  render() {
    return (
      <TouchableRipple onPress={this.uploadImages} underlayColor="transparent">
        {this.props.children}
      </TouchableRipple>
    );
  }
}
