import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from '../../../assets/theme/colors';
import Button from "../../../components/Button";
import I18n from 'utils/locale';
export default class TabPanel extends Component {

  static propTypes = {
    buttonTitle:PropTypes.string.isRequired
  };

  static defaultProps = {
    buttonTitle:I18n.t('next'),
  };

  render() {
    let {buttonTitle} = this.props;
    return (
      <View>
        {this.props.children}
        <Button title={buttonTitle} onPress={()=>{}}/>
      </View>
    );
  }
}
