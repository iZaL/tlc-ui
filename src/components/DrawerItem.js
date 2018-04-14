/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconFactory from 'components/IconFactory';
import {DrawerItem as PaperDrawerItem} from 'react-native-paper';

export default class DrawerItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onItemPress: PropTypes.func.isRequired,
    active: PropTypes.bool,
    iconProps: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      size: PropTypes.number,
    }).isRequired,
    routeName: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }

  render() {
    const {label, onItemPress, active, routeName, iconProps,iconStyle} = this.props;
    return (
      <PaperDrawerItem
        label={label}
        onPress={() => onItemPress(routeName)}
        active={active}
        icon={
          <IconFactory
            style={iconStyle}
            size={24}
            {...iconProps}
          />
        }
      />
    )
  }
}
