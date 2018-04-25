import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import {ACTIONS as CUSTOMER_ACTIONS} from "customer/common/actions";
import LoadLocationMapView from "driver/loads/components/LoadLocationMapView";
import LoadPickDropLocation from "driver/loads/components/LoadPickDropLocation";
import LoadInfo from "driver/loads/components/LoadInfo";
import Divider from "components/Divider";
import TripList from "customer/trips/components/TripList";
import {SELECTORS as CUSTOMER_SELECTORS} from "customer/common/selectors";
import {Title} from "react-native-paper";

class LoadDetailScene extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.load !== this.props.load;
  }

  componentDidMount() {
    // const {loadID} = this.props.navigation.state.params;
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadDetails({
        // load_id: loadID,
        load_id: 1,
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
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Text
          style={{paddingRight: 10, color: colors.primary, fontWeight: 'bold'}}>
          {I18n.t('edit')}
        </Text>
      ),
    };
  };

  acceptBooking = () => {
  };

  loadTripMapScene = () => {
    this.props.navigation.navigate('TripTrack', {
      tripID: 1,
    });
  };

  onTripListItemPress = () => {

  };

  render() {
    let {load} = this.props;

    let {origin, destination} = load;

    console.log('props', this.props.load);

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        {origin && destination &&

        <View style={{flex: 1}}>

          <View style={{height: 200, backgroundColor: colors.lightGrey}}>
            <LoadLocationMapView origin={origin} destination={destination}/>
          </View>

          <LoadPickDropLocation origin={origin} destination={destination} style={{padding: 5}}/>

          <Divider style={{marginVertical: 10}}/>

          <LoadInfo load={load} style={{padding: 5}}/>

          <Divider/>

          <Title style={{paddingTop: 10}}> Trip Drivers </Title>

          <TripList items={load.trips || []} onItemPress={this.onTripListItemPress}/>

        </View>
        }
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = CUSTOMER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      // load: getLoadByID(state, props.navigation.state.params.loadID),
      load: getLoadByID(state, 1),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadDetailScene);
