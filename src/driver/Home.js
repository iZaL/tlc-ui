import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as APP_ACTIONS} from "app/common/actions";

class Home extends Component {
  static propTypes = {
    loads: PropTypes.array.isRequired,
  };

  static defaultProps = {
    loads: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchUpcomingTrips());
    this.props.dispatch(APP_ACTIONS.fetchCountries());

  }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {trips} = this.props;
    return (
      <View style={{flex: 1}}>
        <LoadsList
          items={trips.map(trip => trip.load)}
          onItemPress={this.onLoadsListItemPress}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: DRIVER_SELECTORS.getUpcomingTrips(state),
  };
}

export default connect(mapStateToProps)(Home);
