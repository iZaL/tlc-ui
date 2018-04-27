import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import TextInput from 'components/TextInput';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';
export default class LoadWhat extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    request_documents: PropTypes.bool.isRequired,
  };

  render() {
    const {request_documents, use_own_truck, onValueChange} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Label title={I18n.t('documents_request')} style={{flex: 1}} />
          <FormCheck
            checked={request_documents}
            onPress={() =>
              onValueChange('request_documents', !request_documents)
            }
          />
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.row}>
          <Label title={I18n.t('use_own_truck')} style={{flex: 1}} />
          <FormCheck
            checked={use_own_truck}
            onPress={() => onValueChange('use_own_truck', !use_own_truck)}
          />
        </View>
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
