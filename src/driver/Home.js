import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import Heading from "components/Heading";
import I18n from 'utils/locale';

class Home extends Component {

  static propTypes = {
    loads: PropTypes.array.isRequired,
  };

  static defaultProps = {
    loads: [],
  };

  state = {
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchCurrentLoad());
    this.props.dispatch(DRIVER_ACTIONS.fetchLoadRequests());
    this.props.dispatch(APP_ACTIONS.fetchCountries());
  }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  onLoadRequestsListItemPress = (load :object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
      hiddenTabs:['documents','fleets']
    });
  };

  render() {
    let {current_load,load_requests} = this.props;
    let {loadRequestDialogVisible} = this.state;

    console.log('load_requests',load_requests);
    return (
      <ScrollView style={{flex: 1}}>

        {current_load &&
        current_load.id && (
          <LoadsList
            items={[current_load]}
            onItemPress={this.onLoadsListItemPress}
            header={<Heading title={I18n.t('trip_current')} style={{padding:5}}/>}
          />
        )}

          <LoadsList
            items={load_requests}
            onItemPress={this.onLoadRequestsListItemPress}
            header={<Heading title={I18n.t('trip_requests')} style={{padding:5}}/>}
          />

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_load: DRIVER_SELECTORS.getCurrentLoad(state),
    // load_requests:[]
    load_requests: DRIVER_SELECTORS.getLoadRequests(state)
  };
}

export default connect(mapStateToProps)(Home);
