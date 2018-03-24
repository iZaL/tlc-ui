import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import I18n from 'utils/locale';

class ResidencyListScene extends Component {

  static propTypes = {
    residency_countries: PropTypes.array,
  };

  static defaultProps = {
    residency_countries: [],
  };

  // componentDidMount() {
  //   let {status} = this.props.navigation.state.params;
  //   this.props.dispatch(DRIVER_ACTIONS.fetchLoadsByStatus({status: status}));
  // }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {loads} = this.props;
    return <LoadsList items={loads} onItemPress={this.onLoadsListItemPress} />;
  }
}

const makeMapStateToProps = () => {
  const getLoadsByStatus = DRIVER_SELECTORS.getLoadsByStatus();
  const mapStateToProps = (state, props) => {
    return {
      loads:
        getLoadsByStatus(state, props.navigation.state.params.status) || [],
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(ResidencyListScene);
