import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import GridList from 'components/GridList';
import FormLabel from 'components/FormLabel';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
import FormTextInput from "components/FormTextInput";
export default class LoadWhat extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
    packaging: PropTypes.array.isRequired,
    packaging_id: PropTypes.number,
    trailer_id: PropTypes.number,
    onFieldChange: PropTypes.func.isRequired,
    weight: PropTypes.string,
  };

  render() {
    const {
      trailers,
      packaging,
      packaging_id,
      trailer_id,
      weight,
      onFieldChange
    } = this.props;
    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('select_packaging')} />
        <GridList
          items={packaging}
          onItemPress={item => onFieldChange('packaging_id', item.id)}
          activeItemID={packaging_id}
        />

        <Separator
          style={{backgroundColor: colors.mediumGrey, marginVertical: 20}}
        />

        <FormLabel title={I18n.t('select_trailer')} />
        <GridList
          items={trailers}
          onItemPress={item => onFieldChange('trailer_id', item.id)}
          activeItemID={trailer_id}
        />

        <Separator
          style={{backgroundColor: colors.mediumGrey, marginVertical: 20}}
        />

        <FormLabel title={I18n.t('weight')} />
        <FormTextInput
          onChangeText={value => onFieldChange('weight', value)}
          value={weight}
          maxLength={40}
          placeholder={I18n.t('weight')}
          keyboardType="phone-pad"
          style={{backgroundColor:'white',padding:10}}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
