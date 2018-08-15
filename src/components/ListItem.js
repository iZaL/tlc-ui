/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem as PaperListItem} from 'react-native-paper';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';

export default class ListItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string,
    title: PropTypes.string.isRequired,
    iconProps: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.title !== this.props.title;
  }

  static defaultProps = {
    icon: null,
  };

  render() {
    let {
      onPress,
      name,
      title,
      icon,
      iconProps,
      description,
      style,
      ...rest
    } = this.props;
    return (
      <PaperListItem
        onPress={name ? () => onPress(name) : onPress}
        icon={iconProps ? <IconFactory {...iconProps} /> : icon}
        title={title}
        description={description}
        style={style}
        {...rest}
      />
    );
  }
}
