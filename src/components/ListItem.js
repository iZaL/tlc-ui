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
    onItemPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    iconProps: PropTypes.object,
  };

  shouldComponentUpdate(){
    return false;
  }

  render() {
    let {onItemPress, name, iconProps, description} = this.props;
    return (
      <PaperListItem
        onPress={() => onItemPress(name)}
        icon={iconProps ? <IconFactory {...iconProps} /> : null}
        title={I18n.t(name)}
        description={description}
        inset={true}
      />
    );
  };

}