import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, Text} from 'react-native';

import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';

import TabHeader from 'shipper/loads/components/TabHeader';
import LoadWhat from 'shipper/loads/components/LoadWhat';
import LoadWhere from 'shipper/loads/components/LoadWhere';
import LoadWhen from 'shipper/loads/components/LoadWhen';
import LoadHow from 'shipper/loads/components/LoadHow';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';

import Button from 'components/Button';
import moment from 'moment';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';

class LoadAddScene extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    trailers: [],
  };

  state = {
    load_date: undefined,
    load_time: undefined,
    trailer_id: undefined,
    packaging_id: undefined,
  };

  componentDidMount() {
    this.props.dispatch(SHIPPER_ACTIONS.fetchLoadAddData());
  }

  onPickLocationsListPress = () => {
    console.log('pick');
    this.props.navigation.navigate('LocationList', {
      type: 'pick',
    });
  };

  onDropLocationsListPress = () => {
    console.log('drop');
    this.props.navigation.navigate('LocationList', {
      type: 'drop',
    });
  };

  onPickLocationItemPress = () => {};

  onFieldChange = (field, value) => {
    console.log('field', field);
    console.log('value', value);
    if (value) {
      this.setState({[field]: value});
    }
  };

  render() {
    let {load_time, packaging_id, trailer_id} = this.state;
    let {trailers, packaging} = this.props;

    console.log('props', this.props);
    return (
      <ScrollView style={{flex: 1}}>
        <Tabs>
          <TabList>
            <TabHeader title="1" />
            <TabHeader title="2" />
            <TabHeader title="3" />
            <TabHeader title="4" />
            <TabHeader title="5" />
            <TabHeader title="6" />
          </TabList>

          <TabPanels>
            <LoadWhat
              trailers={trailers}
              packaging={packaging}
              selectedPackageId={packaging_id}
              selectedTrailerId={trailer_id}
              onTrailerSelect={item =>
                this.onFieldChange('trailer_id', item.id)}
              onPackagingSelect={item =>
                this.onFieldChange('packaging_id', item.id)}
            />

            <LoadWhere
              pickLocation={{
                address: '5823 Olin Crescent↵Hilpertport, NV 36582-2290',
                city: 'Lake Jadonshire',
                country: {id: 1, name: 'Kuwait'},
                id: 4,
                latitude: 29.66,
                longitude: 47.1,
                state: 'Kassulkeland',
                type: 'pick',
              }}
              onPickLocationsListPress={this.onPickLocationsListPress}
              onDropLocationsListPress={this.onDropLocationsListPress}
              onPickLocationItemPress={this.onPickLocationItemPress}
            />

            <LoadWhen
              onDateChange={date => this.onFieldChange('load_date', date)}
              onTimeChange={time => this.onFieldChange('load_time', time)}
              load_time={load_time}
            />

            <LoadHow />
          </TabPanels>
        </Tabs>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    trailers: TRUCK_SELECTORS.getTrailers(state),
    packaging: TRUCK_SELECTORS.getPackaging(state),
  };
}

export default connect(mapStateToProps)(LoadAddScene);
