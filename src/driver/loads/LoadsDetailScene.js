import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import LoadLocationMapView from "driver/loads/components/LoadLocationMapView";
import LoadPickDropLocation from "driver/loads/components/LoadPickDropLocation";
import Separator from "components/Separator";
import LoadInfo from "driver/loads/components/LoadInfo";
import Button from "../../components/Button";

class LoadsDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),

    load: PropTypes.shape({
      route: PropTypes.object.isRequired,
    }).isRequired,

  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {
      route: {}
    },
  };

  componentDidMount() {
    const {routeID} = this.props.navigation.state.params;
    this.props.dispatch(
      DRIVER_ACTIONS.fetchRouteTransits({
        route_id: routeID,
      }),
    );
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <View style={{height: 200}}>
          <LoadLocationMapView/>
        </View>

        <View style={{padding:5,}}>
          <LoadPickDropLocation/>
          <LoadInfo />
        </View>

        <Separator style={{marginTop:10,marginBottom:50}}/>

        <Button title="ACCEPT BOOKING"/>

      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      load: {route: {}},
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadsDetailScene);
