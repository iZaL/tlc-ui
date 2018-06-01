/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
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

  static defaultProps = {};

  render() {
    let {item, onPress} = this.props;

    let {type, url, expiry_date} = item;

    return (
      <Card onPress={() => onPress(item)}>
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
            }}
          />
        </View>
      </Card>
    );
  }
}
