import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";
import PropTypes from 'prop-types';
import colors from "assets/theme/colors";
export default class AlertBox extends Component {

  static propTypes = {
    text:PropTypes.string.isRequired
  };

  render() {
    let {text} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> {text} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  text:{
    color:'white',
    fontSize:25,
    // fontWeight:'bold'
  }
});
