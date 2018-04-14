/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as PaperListItem} from 'react-native-paper';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';

const ListItem = ({onItemPress, name, iconProps, description}) => {
  return (
    <PaperListItem
      onPress={() => onItemPress(name)}
      icon={<IconFactory {...iconProps} />}
      title={I18n.t(name)}
      description={description}
      inset={true}
    />
  );
};

ListItem.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  iconProps: PropTypes.object.isRequired,
};

export default ListItem;
