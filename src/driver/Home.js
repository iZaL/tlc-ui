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

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchCurrentLoad());
    this.props.dispatch(APP_ACTIONS.fetchCountries());
  }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {current_load} = this.props;
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

        <View style={{marginVertical:10,padding: 10, backgroundColor: 'white'}}>
          <Heading title={I18n.t('trip_requests')}/>
        </View>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_load: DRIVER_SELECTORS.getCurrentLoad(state),
  };
}

export default connect(mapStateToProps)(Home);
