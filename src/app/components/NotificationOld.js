import PropTypes from 'prop-types';
import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import I18n from 'utils/locale';
import Dialog from 'components/Dialog';

export default class Notification extends Component {
  static propTypes = PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired;

  state = {
    visible: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEmpty(nextProps.message)) {
      return {
        visible: true,
      };
    } else {
      return null;
    }
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.props.dismissNotification();
  };

  render() {
    const {type, message} = this.props;

    const {visible} = this.state;

    return (
      <Dialog
        visible={visible}
        title={type.toUpperCase()}
        description={message}
        rightPress={this.closeModal}
        rightText={I18n.t('close')}
      />
    );
  }
}
