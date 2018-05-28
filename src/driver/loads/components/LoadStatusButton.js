/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Button from 'components/Button';
import I18n from 'utils/locale';
import Dialog from 'components/Dialog';

export default class LoadStatusButton extends PureComponent {
  static propTypes = {
    trip: PropTypes.object.isRequired,
    onAccept: PropTypes.func,
  };

  state = {
    showAcceptConfirmDialog: false,
  };

  static defaultProps = {};

  onAccept = () => {
    this.setState({
      showAcceptConfirmDialog: false,
    });
    this.props.onAccept();
  };

  render() {
    let {trip} = this.props;
    let {showAcceptConfirmDialog} = this.state;

    if (trip.can_accept) {
      return (
        <View>
          <Button
            title={I18n.t('accept').toUpperCase()}
            onPress={() => this.setState({showAcceptConfirmDialog: true})}
            style={{marginVertical: 10}}
          />
          <Dialog
            title={I18n.t('accept_trip?')}
            rightPress={this.onAccept}
            leftPress={() => this.setState({showAcceptConfirmDialog: false})}
            leftText={I18n.t('cancel')}
            visible={showAcceptConfirmDialog}
          />
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
});
