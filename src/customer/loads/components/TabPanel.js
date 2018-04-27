import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Button from 'components/Button';
import I18n from 'utils/locale';

export default class TabPanel extends Component {
  static propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    hideNextButton: PropTypes.bool.isRequired
  };

  static defaultProps = {
    buttonTitle: I18n.t('next'),
    hideNextButton: false
  };

  onButtonPress = () => {
    let {activeIndex, onSelect} = this.props;
    return onSelect(activeIndex + 1);
  };

  render() {
    let {buttonTitle, hideNextButton,style} = this.props;

    return (
      <View style={style}>
        {this.props.children}

        {
          !hideNextButton &&
          <Button
            title={buttonTitle}
            onPress={this.onButtonPress}
            style={{marginVertical: 10}}
          />
        }

      </View>
    );
  }
}
