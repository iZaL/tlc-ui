import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import CheckedListItem from 'components/CheckedListItem';

export default class LoadWhat extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    request_documents: PropTypes.bool.isRequired,
  };

  render() {
    const {request_documents, use_own_truck, onValueChange} = this.props;

    return (
      <View style={styles.container}>
        <CheckedListItem
          checked={request_documents}
          title={I18n.t('documents_request')}
          onPress={() => onValueChange('request_documents', !request_documents)}
        />

        <Divider style={{marginVertical: 5}} />

        <CheckedListItem
          checked={use_own_truck}
          title={I18n.t('use_own_truck')}
          onPress={() => onValueChange('use_own_truck', !use_own_truck)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
