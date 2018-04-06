import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';

export default class LoadWhat extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    passes: PropTypes.array.isRequired,
  };

  renderRow = ({item}) => {
    let {onValueChange, passes} = this.props;
    return (
      <View style={styles.row}>
        <FormLabel
          title={`${item.name} - ${item.country.name}`}
          style={{flex: 1}}
        />
        <FormCheck
          checked={passes.includes(item.id)}
          onPress={() => onValueChange(item.id)}
        />
      </View>
    );
  };

  render() {
    let {items, passes} = this.props;
    return (
      <View>
        <FormLabel title={I18n.t('load_passes')} style={{marginBottom: 10}} />

        <FlatList
          data={items}
          style={styles.listContainer}
          renderItem={this.renderRow}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <Separator style={{marginVertical: 5}} />
          )}
          keyExtractor={(item, index) => `${index}`}
          extraData={passes}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
