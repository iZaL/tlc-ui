/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import ListRow from 'components/ListRow';
import UserInfo from 'components/UserInfo';

export default class ReceiverInfo extends Component {
  static propTypes = {
    // onPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    console.log('@todo:load bigger image');
  };

  render() {
    let {name, email, mobile, phone} = this.props;

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
