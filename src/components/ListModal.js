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
    children:PropTypes.any.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    let {isVisible, onCancel, title,children,style} = this.props;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={isVisible}
          transparent={false}
          style={[{
            backgroundColor: 'white',
            paddingTop: 64,
            paddingHorizontal: 20,
          },style]}
          onBackdropPress={onCancel}>
          <Headline style={styles.headline}>{title}</Headline>
          {children}
          <Button onPress={onCancel} raised primary dark style={{marginBottom:50,paddingVertical:10}}>{I18n.t('save')}</Button>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // margin: 0,
    // padding: 0
    flex:1,
  },
  listContainer: {
    flex:1,
    margin: 5,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
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
