/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import I18n from 'utils/locale';
import ImageViewer from 'components/ImageViewer';
import {
  Card,
  Paragraph,
  Title,
} from 'react-native-paper';
import {View} from 'react-native';
import Button from 'components/Button';

export default class DocumentCard extends Component {
  static propTypes = {
    onEditPress: PropTypes.func,
    onDeletePress: PropTypes.func,
    item: PropTypes.object.isRequired,
    country: PropTypes.object,
    expiry_date: PropTypes.string,
    image: PropTypes.string,
    number: PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.item !== this.props.item ||
      nextProps.image !== this.props.image ||
      nextState.imageModalVisible !== this.state.imageModalVisible
    );
  }

  state = {
    imageModalVisible: false,
    images: [],
  };

  static defaultProps = {
    onEditPress: () => {},
    onDeletePress: () => {},
  };

  onCardCoverPress = image => {
    this.setState({
      imageModalVisible: true,
      images: [{url: image}],
    });
  };

  hideImageModal = () => {
    this.setState({
      imageModalVisible: false,
      images: [],
    });
  };

  render() {
    let {onEditPress, onDeletePress, item} = this.props;
    let {images, imageModalVisible} = this.state;

    let {country, image, expiry_date, number} = item;

    return (
      <Card>
        <Card.Content>
          <Title>{country.name}</Title>
          <Paragraph>{number}</Paragraph>
        </Card.Content>

        {image ? (
          <Touchable
            onPress={() => this.onCardCoverPress(image)}
            style={{flex: 1}}>
            <Card.Cover source={{uri: image}} />
          </Touchable>
        ) : (
          <View />
        )}

        <View style={{flexDirection: 'row'}}>
          <Card.Actions>
            <Button>{expiry_date}</Button>
          </Card.Actions>
          <Card.Actions
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Button primary onPress={() => onEditPress(item)}>
              {I18n.t('edit')}
            </Button>
          </Card.Actions>
        </View>
        <ImageViewer
          visible={imageModalVisible}
          images={images}
          onClose={this.hideImageModal}
        />
      </Card>
    );
  }
}
