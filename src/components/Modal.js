/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Button, Headline} from 'react-native-paper';
import I18n from 'utils/locale';

export default class extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    onSave: PropTypes.func.isRequired,
    title: PropTypes.func,
  };

  static defaultProps = {
    header: null,
    buttonText: I18n.t('save'),
  };

  render() {
    let {
      visible,
      onCancel,
      header,
      children,
      style,
      buttonText,
      onSave,
    } = this.props;

    return (
      <Modal
        isVisible={visible}
        transparent={true}
        style={[styles.container, style]}
        onSwipe={onCancel}
        swipeDirection="down">
        {header && typeof header === 'string' ? (
          <Headline style={styles.headline}>{header}</Headline>
        ) : (
          header
        )}
        {children}
        <Button onPress={onSave} raised primary dark>
          {buttonText}
        </Button>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    backgroundColor: 'white',
    opacity: 0.95,
    paddingTop: 40,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {},
});
