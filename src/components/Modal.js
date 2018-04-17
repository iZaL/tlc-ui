/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Button, Headline} from 'react-native-paper';
import I18n from 'utils/locale';

export default class AppModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    title: PropTypes.func,
  };

  static defaultProps = {
    header: null,
  };

  render() {
    let {isVisible, onCancel, header, children, style} = this.props;

    return (
      <Modal
        isVisible={isVisible}
        transparent={true}
        style={[
          styles.container,
          style,
        ]}
        onSwipe={onCancel}
        swipeDirection="down"
      >
        {
          header && typeof(header) === 'string' ?
            <Headline style={styles.headline}>{header}</Headline>
            : header
        }

        {children}
        <Button
          onPress={onCancel}
          raised
          primary
          dark
          style={{padding: 10}}
        >
          {I18n.t('save')}
        </Button>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    backgroundColor: 'white',
    opacity: .95,
    paddingTop: 40,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {},
});
