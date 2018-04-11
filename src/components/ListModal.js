/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';
import colors from 'assets/theme/colors';
import {Button, Headline} from 'react-native-paper';
import I18n from 'utils/locale';

export default class ListModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    let {isVisible, onCancel, title, children, style} = this.props;

    return (
      <Modal
        isVisible={isVisible}
        transparent={false}
        style={[
          {
            backgroundColor: 'white',
            paddingTop: 30,
            paddingBottom: 15,
            paddingHorizontal: 15,
            justifyContent: 'flex-start',
          },
          style,
        ]}
        onBackdropPress={onCancel}>
        <Headline style={styles.headline}>{title}</Headline>
        {children}
        <Button
          onPress={onCancel}
          raised
          primary
          dark
          style={{paddingVertical: 10, margin: 0}}>
          {I18n.t('save')}
        </Button>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {},
});
