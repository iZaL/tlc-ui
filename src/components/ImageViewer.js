/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';

export default class extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    visible: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    let {visible, images, onClose, ...rest} = this.props;
    return (
      <Modal
        isVisible={visible}
        transparent={true}
        onRequestClose={onClose}
        style={{margin: 10}}
        onSwipe={onClose}
        swipeDirection="down"
        onBackdropPress={onClose}
        backdropColor={'black'}
        backdropOpacity={0.5}
        // useNativeDriver={true}
      >
        <ImageViewer imageUrls={images} onSwipeDown={onClose} {...rest} />
      </Modal>
    );
  }
}
