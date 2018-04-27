/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem as PaperListItem, Title} from 'react-native-paper';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import {Text, View,StyleSheet} from "react-native";
import Label from "./Label";

export default class ListIRow extends Component {
  static propTypes = {
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    icon:null
  };

  render() {
    let {left,right} = this.props;
    return (
      <View style={styles.container}>
        <Label title={left}/>
        <Title>{right}</Title>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10
  },
  left:{

  }
});