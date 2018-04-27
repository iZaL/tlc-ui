import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import GridList from 'components/GridList';
import Label from 'components/Label';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import TextInput from 'components/TextInput';
export default class LoadWhat extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
    packaging: PropTypes.array.isRequired,
    packaging_id: PropTypes.number,
    trailer_id: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    weight: PropTypes.string,
  };

  render() {
    const {
      trailers,
      packaging,
      packaging_id,
      trailer_id,
      weight,
      onValueChange,
    } = this.props;
    return (
      <View style={styles.container}>
        <Label
          title={I18n.t('packaging_select')}
          style={{marginBottom: 5}}
        />

        <GridList
          items={packaging}
          onItemPress={item => onValueChange('packaging_id', item.id)}
          activeItemID={packaging_id}
        />

        <Divider
          style={{backgroundColor: colors.mediumGrey, marginVertical: 20}}
        />

        <Label title={I18n.t('trailer_select')} style={{marginBottom: 5}} />
        <GridList
          items={trailers}
          onItemPress={item => onValueChange('trailer_id', item.id)}
          activeItemID={trailer_id}
        />

        <Divider
          style={{backgroundColor: colors.mediumGrey, marginVertical: 20}}
        />

        <View style={{padding: 5, backgroundColor: 'white'}}>
          <TextInput
            onValueChange={onValueChange}
            field="weight"
            value={weight}
            maxLength={40}
            label={I18n.t('weight')}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
