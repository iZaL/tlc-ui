import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import DriversList from "customer/loads/components/DriversList";

class TripCreateScene extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
  };

  componentDidMount() {
    // let {loadID} = this.props.navigation.state.params;
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadBookableDrivers({
        // loadID: loadID,
        loadID: 1,
      }),
    );
  }

  render() {
    let {load} = this.props;
    console.log('props', load);

    if (load.id) {
      return (
        <ScrollView style={{flex: 1}}>
          <DriversList onItemPress={()=>{}} items={[]} />
        </ScrollView>
      );
    }

    return null;
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = CUSTOMER_SELECTORS.getLoadDrivers();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, 1),
      // load: getLoadByID(state, props.navigation.state.params.loadID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TripCreateScene);
