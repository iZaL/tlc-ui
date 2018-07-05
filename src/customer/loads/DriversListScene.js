import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import DriversList from 'customer/loads/components/DriversList';

type STATUS = 'working|confirmed|completed';

class DriversListScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number,
        }),
      }),
    }).isRequired,
    drivers: PropTypes.array,
  };

  static defaultProps = {};

  componentDidMount() {
    let {loadID} = this.props.navigation.state.params;
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadDrivers({
        loadID: loadID,
      }),
    );
  }

  onDriversListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetailOptionsList', {
      loadID: load.id,
    });
  };

  render() {
    let {drivers} = this.props;
    return (
      <DriversList items={drivers} onItemPress={this.onDriversListItemPress} />
    );
  }
}

const makeMapStateToProps = () => {
  const getDriversForLoad = CUSTOMER_SELECTORS.getDriversForLoad();
  const mapStateToProps = (state, props) => {
    return {
      drivers:
        getDriversForLoad(state, props.navigation.state.params.loadID) || [],
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(DriversListScene);
