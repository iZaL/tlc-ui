/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

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

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    onEditPress: () => {},
    onDeletePress: () => {},
  };

  render() {
    let {onEditPress, onDeletePress, item} = this.props;

    let {country, image, expiry_date, number} = item;

    return (
      <Card>
        <CardContent>
          <Title>{country && country.name}</Title>
          <Paragraph>{number}</Paragraph>
        </CardContent>

        {image ? <CardCover source={{uri: image}} /> : <View />}

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
      </Card>
    );
  }
}
