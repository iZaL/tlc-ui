/**
 * @flow
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from 'assets/theme/colors';

const components = {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
};

class IconFactory extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(){
    return false;
  }

  render() {
    let {type, ...rest} = this.props;
    const Icon = components[type];
    return (
      <Icon color={colors.fadedGrey} {...rest} />
    );
  }
}

export default IconFactory;
