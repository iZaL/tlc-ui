import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CountryNames extends Component {
  static propTypes = {
    items: PropTypes.array,
  };

  static defaultProps = {
    items: [],
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {items} = this.props;

    if (items.length) {
      return items.join(',');
    }

    return null;
  }
}
