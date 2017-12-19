import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import TrailersList from "trucks/components/TrailersList";

class UpdateTrailerScene extends Component {

  static propTypes = {
    trailers: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(TRUCK_ACTIONS.fetchTrailers());
  }

  onTrailerListItemPress = (item:object) => {
    let params = {
      trailer_id:item.id,
    };

    this.props.dispatch(DRIVER_ACTIONS.saveTruck(params));
  };

  render() {
    const {
      trailers,
      user : {profile : {truck }}
    } = this.props;

    return (
      <TrailersList items={trailers} onItemPress={this.onTrailerListItemPress} activeItemID={truck && truck.trailer ? truck.trailer.id : 0} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
    trailers: TRUCK_SELECTORS.getTrailers(state),
  };
}

export default connect(mapStateToProps)(UpdateTrailerScene);
