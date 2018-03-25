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
    // country: PropTypes.object.isRequired,
    // expiry_date: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // number: PropTypes.string.isRequired,
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

    let {country, image, expiry_date, title, number} = item;

    return (
      <Card>
        <CardContent>
          <Title>{country.name}</Title>
          <Paragraph>{number}</Paragraph>
        </CardContent>
        <CardCover source={{uri: image}} />
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
            <Button primary onPress={() => alert('wa')}>
              {I18n.t('edit')}
            </Button>
          </CardActions>
        </View>
      </Card>
    );
  }
}
