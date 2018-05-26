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

export default class CameraUpload extends Component {
  static propTypes = {
    onUpload: PropTypes.func,
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {};

  takePicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => this.props.onUpload(image))
      .catch(e => console.log('e', e));
  };

  render() {
    return (
      <TouchableRipple onPress={this.takePicture} underlayColor="transparent">
        {this.props.children}
      </TouchableRipple>
    );
  }
}
