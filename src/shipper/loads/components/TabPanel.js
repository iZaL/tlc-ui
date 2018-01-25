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

  onButtonPress = () => {
    let {activeIndex, onSelect} = this.props;

    return onSelect(activeIndex + 1);
  };

  render() {
    let {buttonTitle} = this.props;

    console.log('activeIndex', this.props.activeIndex);

    return (
      <View>
        {this.props.children}
        <Button
          title={buttonTitle}
          onPress={this.onButtonPress}
          style={{marginVertical: 10}}
        />
      </View>
    );
  }
}
