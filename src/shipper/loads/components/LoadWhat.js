import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import GridList from 'components/GridList';
import FormLabel from 'components/FormLabel';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
export default class LoadWhat extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
    packaging: PropTypes.array.isRequired,
    selectedPackageId: PropTypes.number,
    selectedTrailerId: PropTypes.number,
    onTrailerSelect: PropTypes.func.isRequired,
    onPackagingSelect: PropTypes.func.isRequired,
  };

  render() {
    const {
      trailers,
      onTrailerSelect,
      packaging,
      onPackagingSelect,
      selectedPackageId,
      selectedTrailerId,
    } = this.props;
    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('select_packaging')} />
        <GridList
          items={packaging}
          onItemPress={onPackagingSelect}
          activeItemID={selectedPackageId}
        />

        <Separator
          style={{backgroundColor: colors.mediumGrey, marginVertical: 20}}
        />

        <FormLabel title={I18n.t('select_trailer')} />
        <GridList
          items={trailers}
          onItemPress={onTrailerSelect}
          activeItemID={selectedTrailerId}
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
