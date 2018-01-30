import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import LoadLocationMapView from 'driver/loads/components/LoadLocationMapView';
import LoadPickDropLocation from 'driver/loads/components/LoadPickDropLocation';
import Separator from 'components/Separator';
import LoadInfo from 'driver/loads/components/LoadInfo';
import Button from 'components/Button';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

class LoadDetailScene extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.load !== this.props.load;
  }

  componentDidMount() {
    const {loadID} = this.props.navigation.state.params;
    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadDetails({
        load_id: loadID,
      }),
    );
  }

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
    load: PropTypes.shape({
      origin: PropTypes.object.isRequired,
      destination: PropTypes.object.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
  };

  acceptBooking = () => {};

  render() {
    let {load} = this.props;

    let {origin, destination} = load;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 200, backgroundColor: colors.lightGrey}}>
          {origin.latitude &&
            destination.latitude && (
              <LoadLocationMapView origin={origin} destination={destination} />
            )}
        </View>

        <View style={{padding: 5}}>
          <LoadPickDropLocation origin={origin} destination={destination} />
          <LoadInfo load={load} />
        </View>

        <Separator style={{marginTop: 10, marginBottom: 50}} />

        <Button
          title={I18n.t('accept_booking').toUpperCase()}
          onPress={this.acceptBooking}
        />
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = DRIVER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, props.navigation.state.params.loadID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadDetailScene);
