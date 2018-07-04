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
export default class TruckInfo extends Component {
  static propTypes = {
    // onPress: PropTypes.func.isRequired,
    truck:PropTypes.shape({
      model:PropTypes.object.isRequired,
      registration_country:PropTypes.object.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    console.log('@todo:load bigger image');
  };

  render() {
    let {truck} = this.props;

    let {
      model,
      plate_number,
      year,
      registration_country,
      image,
      max_weight,
    } = truck;

    return (
      <View style={styles.container}>
        <UserInfo
          style={{padding: 10}}
          image={image}
          nameLabel={I18n.t('registration_country')}
          name={registration_country ? registration_country.name : '-'}
          onAvatarPress={this.onPress}
        />

        <Divider />

        <View style={styles.infoContainer}>
          <ListRow left={I18n.t('model')} right={model ? model.name : '-'} />
          <Divider />
          <ListRow left={I18n.t('year')} right={year} />
          <Divider />
          <ListRow left={I18n.t('plate_number')} right={plate_number} />
          <Divider />
          <ListRow left={I18n.t('max_weight')} right={max_weight} />
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
