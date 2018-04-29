import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import TextInput from 'components/TextInput';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';
import CheckedListItem from "../../../components/CheckedListItem";

export default class LoadWhat extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    activeIDs: PropTypes.array.isRequired,
  };

  renderRow = ({item}) => {
    let {onValueChange, activeIDs} = this.props;
    return (
      <CheckedListItem
        checked={activeIDs.includes(item.id)}
        title={`${item.name} - ${item.country.name}`} onPress={() => onValueChange(item.id)}/>
    );
  };

  render() {
    let {items, activeIDs} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 5}}/>}
        keyExtractor={(item, index) => `${index}`}
        extraData={activeIDs}
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
