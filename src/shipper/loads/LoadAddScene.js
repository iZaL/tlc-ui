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
import LoadPasses from 'shipper/loads/components/LoadPasses';
import LoadReceiver from 'shipper/loads/components/LoadReceiver';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import Button from 'components/Button';
import moment from 'moment';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import TabPanel from './components/TabPanel';
import I18n from 'utils/locale';

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
    weight: undefined,
    request_documents: true,
    use_own_truck: false,
    receiver_name: '',
    receiver_email: '',
    receiver_mobile: '',
    receiver_phone: '',
    passes: [],
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
    this.setState({[field]: value});
  };

  updatePasses = id => {
    console.log('pass', id);
    this.setState({
      passes: this.state.passes.includes(id)
        ? this.state.passes.filter(value => value !== id)
        : this.state.passes.concat(id),
    });
  };

  onLoadPassSearch = searchTerm => {};

  render() {
    let {
      load_time,
      packaging_id,
      trailer_id,
      weight,
      request_documents,
      use_own_truck,
      passes,
      receiver_email,
      receiver_mobile,
      receiver_phone,
      receiver_name,
    } = this.state;
    let {trailers, packaging, gatePasses} = this.props;

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
            <TabPanel>
              <LoadWhat
                trailers={trailers}
                packaging={packaging}
                packaging_id={packaging_id}
                trailer_id={trailer_id}
                weight={weight}
                onFieldChange={this.onFieldChange}
              />
            </TabPanel>

            <TabPanel>
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
            </TabPanel>

            <TabPanel>
              <LoadWhen
                load_time={load_time}
                onFieldChange={this.onFieldChange}
              />
            </TabPanel>

            <TabPanel>
              <LoadHow
                request_documents={request_documents}
                use_own_truck={use_own_truck}
                onFieldChange={this.onFieldChange}
              />
            </TabPanel>

            <TabPanel>
              <LoadPasses
                items={gatePasses}
                passes={passes}
                onSearch={this.onLoadPassSearch}
                onFieldChange={this.updatePasses}
              />
            </TabPanel>

            <TabPanel buttonTitle={I18n.t('save')}>
              <LoadReceiver
                onFieldChange={this.onFieldChange}
                receiver_email={receiver_email}
                receiver_mobile={receiver_mobile}
                receiver_phone={receiver_phone}
                receiver_name={receiver_name}
              />
            </TabPanel>
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
    gatePasses: TRUCK_SELECTORS.getPasses(state),
  };
}

export default connect(mapStateToProps)(LoadAddScene);
