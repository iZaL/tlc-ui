/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import ImageViewer from "components/ImageViewer";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
} from 'react-native-paper';
import {View} from 'react-native';

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

  onCardCoverPress = (image) => {
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
        <CardContent>
          <Title>{country.name}</Title>
          <Paragraph>{number}</Paragraph>
        </CardContent>

        {image ?
          <Touchable onPress={()=>this.onCardCoverPress(image)} style={{flex:1}}>
            <CardCover source={{uri: image}}  />
          </Touchable>
          :
          <View />
        }

        <View style={{flexDirection: 'row'}}>
          <CardActions>
            <Button>{expiry_date}</Button>
          </CardActions>
          <CardActions
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Button primary onPress={() => onEditPress(item)}>
              {I18n.t('edit')}
            </Button>
          </CardActions>
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
