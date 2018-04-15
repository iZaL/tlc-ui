/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {FlatList, Text, View, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import {Button, Checkbox, Headline} from 'react-native-paper';
import I18n from 'utils/locale';
import ListModal from './ListModal';
import CheckedListItem from './CheckedListItem';

export default class Listing extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeIDs: PropTypes.array,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.activeIDs !== nextProps.activeIDs ||
      this.props.items !== nextProps.items
    );
  }

  renderItem = ({item}) => {
    let {onItemPress, activeIDs,titleProp} = this.props;
    return (
      <CheckedListItem
        onPress={() => onItemPress(item)}
        checked={activeIDs.includes(item.id)}
        disabled={item.disabled}
        title={titleProp ? titleProp(item) : item.name}
      />
    );
  };

  render() {
    let {items, style} = this.props;
    return (
      <FlatList
        data={items}
        style={[styles.listContainer, style]}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 10}} />}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // backgroundColor:'blue',
    paddingTop: 10,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetails: {
    flex: 1,
    fontSize: 18,
    color: colors.darkBlue,
    fontWeight: '500',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
