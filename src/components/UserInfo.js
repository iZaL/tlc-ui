/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from "react-native";
import Avatar from "components/Avatar";
import Label from "components/Label";
import {Title} from "react-native-paper";
import I18n from 'utils/locale';

export default class UserInfo extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onAvatarPress:PropTypes.func
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    avatarSize:75,
    nameLabel:I18n.t('name'),
  };

  render() {
    let {image,name,nameLabel,avatarSize,onAvatarPress,style} = this.props;
    return (

      <View style={[styles.container,style]}>
        <Avatar image={image} size={avatarSize} onPress={onAvatarPress} />

        <View style={styles.contentContainer}>
          <Label title={nameLabel}/>
          <Title>{name}</Title>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  contentContainer:{
    paddingHorizontal:20
  }
});