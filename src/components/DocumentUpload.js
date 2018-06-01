/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

export default class DocumentUpload extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  static defaultProps = {
    onPress: () => {},
  };

  state = {
    uploaded_image: this.props.image ? this.props.image : null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.uploaded_image !== nextState.uploaded_image;
  }

  openImagePicker = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({
          // image: response.uri,
          uploaded_image: 'data:image/jpeg;base64,' + response.data,
          // uploaded: true,
        });
        this.props.onPress(response.uri);
      }
    });
  };

  render() {
    let {onPress, style, imageStyle} = this.props;
    return (
      <Touchable onPress={() => this.openImagePicker()}>
        <View style={[styles.container, style]}>
          {this.state.uploaded_image ? (
            <Image
              style={[styles.image, imageStyle]}
              source={{uri: this.state.uploaded_image}}
              resizeMode="cover"
            />
          ) : (
            <MaterialIcons
              name="add-a-photo"
              size={40}
              color={colors.darkGrey}
            />
          )}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.mediumGrey,
    borderWidth: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
