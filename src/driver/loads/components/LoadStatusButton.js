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

export default class LoadStatusButton extends PureComponent {
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
  };

  static defaultProps = {};

  onAccept = () => {
    this.setState({
      showAcceptDialog: false,
    });
    this.props.onAccept();
  };

  onAccept = () => {
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

  render() {
    let {can_accept, can_cancel, can_confirm} = this.props.trip;
    let {showAcceptDialog, showCancelDialog, showConfirmDialog} = this.state;

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
              rightPress={this.onAccept}
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
