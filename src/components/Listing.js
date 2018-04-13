/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {FlatList, Text, View, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import {Button, Checkbox, Headline} from 'react-native-paper';
import I18n from 'utils/locale';
import ListModal from './ListModal';

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
    let {onItemPress, activeIDs} = this.props;
    return (
      <Touchable onPress={() => (item.disabled ? {} : onItemPress(item))}>
        <View
          style={[styles.itemRowContainer, item.disabled && {opacity: 0.4}]}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Checkbox
            checked={activeIDs.includes(item.id)}
            color={colors.primary}
          />
        </View>
      </Touchable>
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
        ItemSeparatorComponent={() => (
          <Separator style={{marginVertical: 10}} />
        )}
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
