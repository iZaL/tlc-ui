/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import ListRow from 'components/ListRow';
import PropTypes from 'prop-types';

export default class ReceiverInfo extends Component {
  static propTypes = {
    receiver:PropTypes.object
  };

  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    console.log('@todo:load bigger image');
  };

  static defaultProps = {
    receiver:{}
  };

  render() {
    let {name, email, mobile, phone} = this.props.receiver;

    return (
      <View style={styles.container}>
        <ListRow left={I18n.t('name')} right={name} />
        <Divider />
        <ListRow left={I18n.t('email')} right={email} />
        <Divider />
        <ListRow left={I18n.t('mobile')} right={mobile} />
        <Divider />
        <ListRow left={I18n.t('phone')} right={phone} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  infoContainer: {},
});
