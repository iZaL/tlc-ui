/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import Modal from 'components/Modal';
import Listing from 'components/Listing';

export default class List extends Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    modalTitle: PropTypes.string,
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
      <Modal
        isVisible={isVisible}
        transparent={false}
        onBackdropPress={onCancel}
        modalTitle={modalTitle}
        onCancel={onCancel}
      >
        {header}
        <Listing
          onItemPress={onItemPress}
          items={items}
          activeIDs={activeIDs}
          title={title}
          description={description}
        />
        {children}
      </Modal>
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
