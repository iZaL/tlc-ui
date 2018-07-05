/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Button from 'components/Button';
import I18n from 'utils/locale';
import Dialog from 'components/Dialog';
import {Colors} from 'react-native-paper';
import ConfirmedButton from '../../../components/ConfirmedButton';

export default class LoadStatusButton extends Component {
  static propTypes = {
    trip: PropTypes.object.isRequired,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  static defaultProps = {};

  // shouldComponentUpdate(nextProps,prevState) {
  //   return nextProps.trip !== this.props.trip || prevState !== this.state;
  // }

  onAccept = () => {
    this.props.onAccept();
  };

  onCancel = () => {
    this.props.onCancel();
  };

  onConfirm = () => {
    this.props.onConfirm();
  };

  onStart = () => {
    this.props.onStart();
  };

  onStop = () => {
    this.props.onStop();
  };

  render() {
    let {can_accept, can_cancel, can_start, can_stop} = this.props.trip;

    if (can_accept) {
      return (
        <ConfirmedButton
          title={I18n.t('accept').toUpperCase()}
          onPress={this.onAccept}
          description={I18n.t('accept_trip?')}
        />
      );
    }

    if (can_cancel) {
      return (
        <ConfirmedButton
          title={I18n.t('cancel').toUpperCase()}
          onPress={this.onCancel}
          style={{marginVertical: 10, backgroundColor: Colors.teal200}}
          description={I18n.t('cancel_trip?')}
        />
      );
    }

    if (can_start) {
      return (
        <ConfirmedButton
          title={I18n.t('start_trip').toUpperCase()}
          description={I18n.t('start_trip?')}
          onPress={this.onStart}
          style={{marginVertical: 10}}
        />
      );
    }

    if (can_stop) {
      return (
        <ConfirmedButton
          title={I18n.t('stop_trip').toUpperCase()}
          description={I18n.t('stop_trip?')}
          onPress={this.onStop}
          style={{marginVertical: 10, backgroundColor: Colors.teal200}}
        />
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
  },
  col: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
