import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';
import I18n from 'utils/locale';

export default class AppButton extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.title !== this.props.title
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: I18n.t('save'),
  };

  render() {
    const {onPress, style, title, disabled} = this.props;
    return (
      <Button
        onPress={onPress}
        raised
        primary
        dark
        style={[{padding: 10, marginTop: 20}, style]}
        disabled={disabled}>
        {title}
      </Button>
    );
  }
}
