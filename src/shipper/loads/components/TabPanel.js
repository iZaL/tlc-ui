import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Button from 'components/Button';
import I18n from 'utils/locale';

export default class TabPanel extends Component {
  static propTypes = {
    buttonTitle: PropTypes.string.isRequired,
  };

  static defaultProps = {
    buttonTitle: I18n.t('next'),
  };

  render() {
    let {buttonTitle} = this.props;
    return (
      <View>
        {this.props.children}
        <Button title={buttonTitle} onPress={() => {}} style={{marginVertical:10}}/>
      </View>
    );
  }
}
