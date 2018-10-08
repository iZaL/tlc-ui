/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Card.Actions,
  Card.Content,
  Card.Cover,
  Title,
} from 'react-native-paper';
import {View} from 'react-native';
import Button from 'components/Button';

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
        <Card.Content>
          <Title>{type.name}</Title>
        </Card.Content>

        {url ? <Card.Cover source={{uri: url}} /> : <View />}

        <View style={{flexDirection: 'row'}}>
          <Card.Actions>
            <Button>{expiry_date}</Button>
          </Card.Actions>
          <Card.Actions
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
