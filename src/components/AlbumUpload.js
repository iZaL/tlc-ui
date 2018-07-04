/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableRipple} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import map from 'lodash/map';
import {View, StyleSheet, Image} from 'react-native';
import union from 'lodash/union';
import Gallery from 'components/Gallery';

export default class AlbumUpload extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onUpload: PropTypes.func,
  };

  state = {
    images: [],
    uploaded_images: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.images !== prevState.images) {
      return {
        images: nextProps.images,
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, prevState) {
    return prevState.uploaded_images !== this.state.uploaded_images;
  }

  static defaultProps = {
    max: 5,
  };

  uploadImages = () => {
    const uploadedImages = this.state.images;
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
      .then(pendingImages => {
        this.setState({
          uploaded_images: union(this.state.uploaded_images, pendingImages),
        });
        this.props.onUpload(pendingImages);
      })
      .catch(e => console.log('error uploading image', e));
  };

  render() {
    let {images, uploaded_images} = this.state;
    return (
      <View style={styles.container}>
        <TouchableRipple
          onPress={this.uploadImages}
          underlayColor="transparent">
          <View>{this.props.children}</View>
        </TouchableRipple>

        <View style={styles.listContainer}>
          <Gallery
            images={images.map(image => {
              return {
                url: image,
              };
            })}
            imageName={name => name.url}
          />
          <Gallery
            images={uploaded_images.map(image => {
              return {
                url: image,
              };
            })}
            imageName={name => name.url}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});
