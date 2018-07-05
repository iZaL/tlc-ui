/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import ListRow from 'components/ListRow';
import UserInfo from 'components/UserInfo';
import PropTypes from 'prop-types';

export default class DriverInfo extends Component {
  static propTypes = {
    driver: PropTypes.shape({
      nationalities: PropTypes.arrayOf(
        PropTypes.shape({
          country: PropTypes.object.isRequired,
        }).isRequired,
      ),
    }).isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    console.log('@todo:load bigger image');
  };

  render() {
    let {driver} = this.props;

    if (!driver) {
      return null;
    }

    let {user} = driver;

    return (
      <View style={styles.container}>
        <UserInfo
          style={{padding: 10}}
          image={user.image}
          name={user.name}
          onAvatarPress={this.onPress}
        />

        <Divider />

        <View style={styles.infoContainer}>
          <ListRow
            left={I18n.t('nationality')}
            right={
              driver.nationalities
                ? driver.nationalities
                    .map(
                      nationality =>
                        nationality.country ? nationality.country.name : '-',
                    )
                    .join(',')
                : '-'
            }
          />

          <Divider />
          <ListRow left={I18n.t('mobile')} right={user.mobile} />
          <Divider />

          {driver.mobile && (
            <View>
              <ListRow left={`${I18n.t('mobile')}`} right={driver.mobile} />
              <Divider />
            </View>
          )}

          {driver.phone && (
            <View>
              <ListRow left={`${I18n.t('mobile')} 1`} right={driver.phone} />
              <Divider />
            </View>
          )}

          <ListRow left={I18n.t('email')} right={user.email} />
        </View>
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
