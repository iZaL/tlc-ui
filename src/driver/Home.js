import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import Heading from 'components/Heading';
import I18n from 'utils/locale';

class Home extends Component {
  static propTypes = {
    loads: PropTypes.array.isRequired,
  };

  static defaultProps = {
    loads: [],
  };

  state = {};

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchCurrentLoad());
    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadsByStatus({
        status: 'pending',
      }),
    );
    this.props.dispatch(APP_ACTIONS.fetchCountries());
  }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  onLoadRequestsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {current_load, loads_pending} = this.props;
    console.log('loads_pending', loads_pending);
    let {loadRequestDialogVisible} = this.state;

    return (
      <ScrollView style={{flex: 1}}>
        {current_load &&
          current_load.id && (
            <LoadsList
              items={[current_load]}
              onItemPress={this.onLoadsListItemPress}
              header={
                <Heading title={I18n.t('trip_current')} style={{padding: 5}} />
              }
            />
          )}

        <LoadsList
          items={loads_pending}
          onItemPress={this.onLoadRequestsListItemPress}
          header={
            <Heading title={I18n.t('trip_requests')} style={{padding: 5}} />
          }
        />
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadsByStatus = DRIVER_SELECTORS.getLoadsByStatus();
  const mapStateToProps = (state, props) => {
    return {
      current_load: DRIVER_SELECTORS.getCurrentLoad(state),
      loads_pending: getLoadsByStatus(state, 'pending'),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Home);
