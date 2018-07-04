import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
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

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadsByStatus({
        status: 'confirmed',
      }),
    );
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadsByStatus({
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
    let {loads_confirmed, loads_pending} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <LoadsList
          items={loads_confirmed}
          onItemPress={this.onLoadsListItemPress}
          header={
            <Heading title={I18n.t('loads_confirmed')} style={{padding: 5}} />
          }
        />

        <LoadsList
          items={loads_pending}
          onItemPress={this.onLoadRequestsListItemPress}
          header={
            <Heading title={I18n.t('loads_pending')} style={{padding: 5}} />
          }
        />
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadsByStatus = CUSTOMER_SELECTORS.getLoadsByStatus();
  const mapStateToProps = state => {
    return {
      loads_pending: getLoadsByStatus(state, 'pending'),
      loads_confirmed: getLoadsByStatus(state, 'confirmed'),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Home);
