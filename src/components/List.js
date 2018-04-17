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
    modalTitle: PropTypes.string,
    title: PropTypes.func,
    description: PropTypes.func,
    activeIDs: PropTypes.array,
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
      modalTitle,
      children,
      items,
      activeIDs,
      header,
      description,
      title,
    } = this.props;
    return (
      <ListModal
        isVisible={isVisible}
        transparent={false}
        onBackdropPress={onCancel}
        modalTitle={modalTitle}
        onCancel={onCancel}>
        {header}
        <Listing
          onItemPress={onItemPress}
          items={items}
          activeIDs={activeIDs}
          title={title}
          description={description}
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
