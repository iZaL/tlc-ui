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

export default class LoadStatusButton extends Component {

  static propTypes = {
    trip: PropTypes.object.isRequired,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  state = {
    showAcceptDialog: false,
    showCancelDialog: false,
    showConfirmDialog: false,
    showStartDialog: false,
    showStopDialog: false,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps,prevState) {
    return nextProps.trip !== this.props.trip || prevState !== this.state;
  }

  onAccept = () => {
    this.setState({
      showAcceptDialog: false,
    });
    this.props.onAccept();
  };

  onCancel = () => {
    this.setState({
      showCancelDialog: false,
    });
    this.props.onCancel();
  };

  onConfirm = () => {
    this.setState({
      showConfirmDialog: false,
    });
    this.props.onConfirm();
  };

  onStart = () => {
    this.setState({
      showStartDialog: false,
    });
    this.props.onStart();
  };

  onStop = () => {
    this.setState({
      showStopDialog: false,
    });
    this.props.onStop();
  };

  render() {
    let {
      can_accept,
      can_cancel,
      can_confirm,
      can_start,
      can_stop,
    } = this.props.trip;

    console.log('trip',this.props.trip);

    let {
      showAcceptDialog,
      showCancelDialog,
      showConfirmDialog,
      showStartDialog,
      showStopDialog,
    } = this.state;

    if (can_accept) {
      return (
        <View>
          <Button
            title={I18n.t('accept').toUpperCase()}
            onPress={() => this.setState({showAcceptDialog: true})}
            style={{marginVertical: 10}}
          />
          <Dialog
            title={I18n.t('accept_trip?')}
            rightPress={this.onAccept}
            leftPress={() => this.setState({showAcceptDialog: false})}
            leftText={I18n.t('cancel')}
            visible={showAcceptDialog}
          />
        </View>
      );
    }

    if (can_cancel) {
      return (
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Button
              title={I18n.t('cancel').toUpperCase()}
              onPress={() => this.setState({showCancelDialog: true})}
              style={{marginVertical: 10, backgroundColor: Colors.teal200}}
            />
            <Dialog
              title={I18n.t('cancel_trip?')}
              rightPress={this.onCancel}
              leftPress={() => this.setState({showCancelDialog: false})}
              leftText={I18n.t('cancel')}
              visible={showCancelDialog}
            />
          </View>

          {can_confirm && (
            <View style={{flex: 1}}>
              <Button
                title={I18n.t('confirm').toUpperCase()}
                onPress={() => this.setState({showConfirmDialog: true})}
                style={{marginVertical: 10}}
              />
              <Dialog
                title={I18n.t('confirm_trip?')}
                rightPress={this.onConfirm}
                leftPress={() => this.setState({showConfirmDialog: false})}
                leftText={I18n.t('cancel')}
                visible={showConfirmDialog}
              />
            </View>
          )}
        </View>
      );
    }

    if (can_start) {
      return (
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Button
              title={I18n.t('start').toUpperCase()}
              onPress={() => this.setState({showStartDialog: true})}
              style={{marginVertical: 10}}
            />
            <Dialog
              title={I18n.t('start_trip?')}
              rightPress={this.onStart}
              leftPress={() => this.setState({showStartDialog: false})}
              leftText={I18n.t('cancel')}
              visible={showStartDialog}
            />
          </View>
        </View>
      );
    }

    if (can_stop) {
      return (
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Button
              title={I18n.t('stop').toUpperCase()}
              onPress={() => this.setState({showStopDialog: true})}
              style={{marginVertical: 10, backgroundColor: Colors.teal200}}
            />
            <Dialog
              title={I18n.t('stop_trip?')}
              rightPress={this.onStop}
              leftPress={() => this.setState({showStopDialog: false})}
              leftText={I18n.t('cancel')}
              visible={showStopDialog}
            />
          </View>
        </View>
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
