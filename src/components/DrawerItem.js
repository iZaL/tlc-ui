/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconFactory from 'components/IconFactory';
import {Drawer} from 'react-native-paper';

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
    const {onItemPress, routeName, iconProps, ...rest} = this.props;
    return (
      <Drawer.Item
        {...rest}
        onPress={() => onItemPress(routeName)}
        icon={<IconFactory {...iconProps} />}
      />
    );
  }
}
