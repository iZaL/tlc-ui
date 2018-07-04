/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import Listing from 'components/Listing';

export default class ListModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    header: PropTypes.any,
    activeIDs: PropTypes.array,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.visible !== nextProps.visible ||
      this.props.activeIDs !== nextProps.activeIDs ||
      this.props.items !== nextProps.items
    );
  }

  render() {
    let {
      onItemPress,
      children,
      items,
      activeIDs,
      description,
      title,
      ...rest
    } = this.props;

    return (
      <Modal {...rest}>
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
