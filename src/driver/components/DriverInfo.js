/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {View, StyleSheet} from "react-native";
import FormLabel from "components/FormLabel";
import {Title} from "react-native-paper";
import Avatar from "components/Avatar";
import I18n from 'utils/locale';
import Divider from "components/Divider";
import ListRow from "components/ListRow";

export default class DriverInfo extends Component {
  static propTypes = {
    // onPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {driver} = this.props;
    let {user} = driver;
    console.log('wa',driver.nationalities.map(country => country.name).join(','));
    return (
      <View style={styles.container}>

        <View style={styles.avatarContainer}>
          <Avatar image={user.image} size={75}/>

          <View style={styles.contentContainer}>
            <FormLabel title={I18n.t('name')}/>
            <Title>{user.name}</Title>
          </View>

        </View>

        <Divider/>

        <View style={styles.infoContainer}>
          <ListRow left={I18n.t('nationality')} right={driver.nationalities.map(nationality => nationality.country.name).join(',')} />
          <Divider/>
          <ListRow left={I18n.t('nationality')} right={driver.nationalities.map(nationality => nationality.country.name).join(',')} />
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
    marginVertical: 10
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  infoContainer: {}
});
