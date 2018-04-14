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
import Listing from './Listing';

export default class List extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    title: PropTypes.string,
    activeIDs: PropTypes.array,
  };

  static defaultProps = {
    title: I18n.t('select_country'),
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.isVisible !== nextProps.isVisible ||
      this.props.activeIDs !== nextProps.activeIDs ||
      this.props.items !== nextProps.items
    );
  }

  render() {
    let {
      isVisible,
      onCancel,
      onItemPress,
      title,
      children,
      items,
      activeIDs,
      header,
    } = this.props;
    return (
      <ListModal
        isVisible={isVisible}
        transparent={false}
        onBackdropPress={onCancel}
        title={title}
        onCancel={onCancel}>
        {header}
        <Listing
          onItemPress={onItemPress}
          items={items}
          activeIDs={activeIDs}
        />
        {children}
      </ListModal>
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
