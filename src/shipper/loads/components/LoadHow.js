import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';
export default class LoadWhat extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    request_documents: PropTypes.bool.isRequired,
  };

  render() {
    const {request_documents, use_own_truck, onFieldChange} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <FormLabel title={I18n.t('request_documents')} style={{flex: 1}} />
          <FormCheck
            checked={request_documents}
            onPress={() =>
              onFieldChange('request_documents', !request_documents)}
          />
        </View>

        <Separator style={{marginVertical: 5}} />

        <View style={styles.row}>
          <FormLabel title={I18n.t('use_own_truck')} style={{flex: 1}} />
          <FormCheck
            checked={use_own_truck}
            onPress={() => onFieldChange('use_own_truck', !use_own_truck)}
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
