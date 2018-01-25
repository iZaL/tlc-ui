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

  // render() {
  //   console.log('Load How');
  //   const {request_documents,use_own_truck,onFieldChange} = this.props;
  //
  //   return (
  //     <View style={styles.container}>
  //
  //       <FormTextInput
  //         onChangeText={value => onFieldChange('password', value)}
  //         value={use_own_truck}
  //         maxLength={40}
  //         secureTextEntry={true}
  //       />
  //
  //       <View style={styles.row}>
  //         <FormLabel title={I18n.t('request_documents')} style={{flex:1}} />
  //         <FormCheck
  //           checked={request_documents}
  //           onPress={() =>
  //             onFieldChange('request_documents', !request_documents)}
  //         />
  //       </View>
  //
  //     </View>
  //   );
  // }

  renderRow = ({item}) => {
    let {onFieldChange, passes} = this.props;
    return (
      <View style={styles.row}>
        <FormLabel
          title={`${item.name} - ${item.country.name}`}
          style={{flex: 1}}
        />
        <FormCheck
          checked={passes.includes(item.id)}
          onPress={() => onFieldChange(item.id)}
        />
      </View>
    );
  };

  render() {
    let {items, passes} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator style={{marginVertical: 5}} />}
        keyExtractor={(item, index) => index}
        extraData={passes}
      />
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
