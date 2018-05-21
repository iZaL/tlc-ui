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

export default class DocumentTypeCard extends Component {
  static propTypes = {
    onEditPress: PropTypes.func,
    onDeletePress: PropTypes.func,
    item: PropTypes.object.isRequired,
    country: PropTypes.object,
    expiry_date: PropTypes.string,
    image: PropTypes.string,
    number: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  static defaultProps = {
  };

  render() {
    let {item,onPress} = this.props;

    let {type, url, expiry_date, } = item;

    return (
      <Card onPress={()=>onPress(item)}>

        <CardContent>
          <Title>{type.name}</Title>
        </CardContent>

        {url ? <CardCover source={{uri: url}} /> : <View />}

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
          </CardActions>
        </View>

      </Card>
    );
  }
}
