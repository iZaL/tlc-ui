import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';
import TabHeader from 'customer/loads/components/TabHeader';
import LoadWhat from 'customer/loads/components/LoadWhat';
import LoadWhere from 'customer/loads/components/LoadWhere';
import LoadWhen from 'customer/loads/components/LoadWhen';
import LoadHow from 'customer/loads/components/LoadHow';
import LoadPasses from 'customer/loads/components/LoadPasses';
import LoadReceiver from 'customer/loads/components/LoadReceiver';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import TabPanel from 'customer/loads/components/TabPanel';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import PackageDimensions from 'customer/loads/components/PackageDimensions';
import TrailerQuantity from 'customer/loads/components/TrailerQuantity';
import moment from 'moment';

class LoadAddScene extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    trailers: [],
  };

  state = {
    load_date: null,
    load_time: moment(),
    trailer_id: null,
    trailer_quantity: 1,
    packaging_id: null,
    packaging_dimension: {
      length: null,
      width: null,
      height: null,
      weight: null,
      quantity: null,
    },
    origin_location_id: null,
    destination_location_id: null,
    weight: null,
    request_documents: true,
    use_own_truck: false,
    receiver_name: 'ABCD',
    receiver_email: 'abcd@test.com',
    receiver_mobile: '00966989382332',
    receiver_phone: '00966989382332',
    passes: [],
    showPackageDimsSelectionModal: false,
    showTrailerQuantitySelectionModal: false,
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchLoadAddData());
  }

  onValueChange = (field, value) => {
    this.setState({[field]: value});

    if (field == 'packaging_id') {
      this.showModal('showPackageDimsSelectionModal');
    }

    if (field == 'trailer_id') {
      this.showModal('showTrailerQuantitySelectionModal');
    }
  };

  updatePasses = id => {
    this.setState({
      passes: this.state.passes.includes(id)
        ? this.state.passes.filter(value => value !== id)
        : this.state.passes.concat(id),
    });
  };

  onLoadPassSearch = searchTerm => {};

  onSaveButtonPress = () => {
    let params = {
      ...this.state,
    };

    return new Promise((resolve, reject) => {
      this.props.dispatch(CUSTOMER_ACTIONS.saveLoad({params, resolve}));
      // dispatch(someActionCreator({ values, resolve, reject }))
    }).then(() => {});
  };

  showModal = name => {
    this.setState({
      [name]: true,
    });
  };

  hideModal = name => {
    this.setState({
      [name]: false,
    });
  };

  onPackagingDimensionsFieldChange = (field, name) => {
    this.setState({
      packaging_dimension: {
        ...this.state.packaging_dimension,
        [field]: name,
      },
    });
  };

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
      origin_location_id,
      destination_location_id,
      showPackageDimsSelectionModal,
      showTrailerQuantitySelectionModal,
      trailer_quantity,
      packaging_dimension,
    } = this.state;

    let {trailers, packaging, gatePasses, locations} = this.props;

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
                onValueChange={this.onValueChange}
              />

              <PackageDimensions
                visible={showPackageDimsSelectionModal}
                onValueChange={this.onPackagingDimensionsFieldChange}
                onCancel={() => this.hideModal('showPackageDimsSelectionModal')}
                onConfirm={() =>
                  this.hideModal('showPackageDimsSelectionModal')
                }
                {...packaging_dimension}
              />

              <TrailerQuantity
                visible={showTrailerQuantitySelectionModal}
                onValueChange={quantity =>
                  this.onValueChange('trailer_quantity', quantity)
                }
                onCancel={() =>
                  this.hideModal('showTrailerQuantitySelectionModal')
                }
                onConfirm={() =>
                  this.hideModal('showTrailerQuantitySelectionModal')
                }
                selected={trailer_quantity}
              />
            </TabPanel>

            <TabPanel>
              <LoadWhere
                origin={locations.find(
                  location => location.id === origin_location_id,
                )}
                destination={locations.find(
                  location => location.id === destination_location_id,
                )}
                locations={locations}
                onValueChange={this.onValueChange}
              />
            </TabPanel>

            <TabPanel>
              <LoadWhen
                load_time={load_time}
                onValueChange={this.onValueChange}
              />
            </TabPanel>

            <TabPanel>
              <LoadHow
                request_documents={request_documents}
                use_own_truck={use_own_truck}
                onValueChange={this.onValueChange}
              />
            </TabPanel>

            <TabPanel>
              <LoadPasses
                items={gatePasses}
                passes={passes}
                onSearch={this.onLoadPassSearch}
                onValueChange={this.updatePasses}
              />
            </TabPanel>

            <LoadReceiver
              onValueChange={this.onValueChange}
              receiver_email={receiver_email}
              receiver_mobile={receiver_mobile}
              receiver_phone={receiver_phone}
              receiver_name={receiver_name}
              onSaveButtonPress={this.onSaveButtonPress}
            />
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
    locations: CUSTOMER_SELECTORS.getLocations(state),
  };
}

export default connect(mapStateToProps)(LoadAddScene);
