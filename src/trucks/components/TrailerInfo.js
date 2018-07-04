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

export default class TrailerInfo extends Component {
  static propTypes = {
    // onPress: PropTypes.func.isRequired,
    trailer:PropTypes.shape({
      type:PropTypes.object.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    console.log('@todo:load bigger image');
  };

  render() {
    let {trailer} = this.props;

    let {type, length, width, height, year, image, max_weight} = trailer;

    return (
      <View style={styles.container}>
        <UserInfo
          style={{padding: 10}}
          image={image}
          nameLabel={I18n.t('type')}
          name={type ? type.name : '-'}
          onAvatarPress={this.onPress}
        />

        <Divider />

        <View style={styles.infoContainer}>
          <ListRow left={I18n.t('year')} right={year} />
          <Divider />
          <ListRow left={I18n.t('length')} right={length} />
          <Divider />
          <ListRow left={I18n.t('width')} right={width} />
          <Divider />
          <ListRow left={I18n.t('height')} right={height} />
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
