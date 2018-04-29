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
import I18n from 'utils/locale';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import Dialog from 'components/Dialog';

class LoadAddScene extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    trailers: [],
  };

  state = {
    isSuccessDialogVisible: false,
    isPackageDimensionDialogVisible: false,
    isTrailerQuantityDialogVisible: false,
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchLoadAddData());
    this.props.dispatch(TRUCK_ACTIONS.fetchTrailerTypes());
  }

  showSuccessModalDialog = () => {
    this.setState({
      isSuccessDialogVisible: true,
    });
  };

  hideSuccessModalDialog = () => {
    this.setState({
      isSuccessDialogVisible: false,
    });
  };

  showPackageDimensionDialog = () => {
    this.setState({
      isPackageDimensionDialogVisible: true,
    });
  };

  hidePackageDimensionDialog = () => {
    this.setState({
      isPackageDimensionDialogVisible: false,
    });
  };

  showTrailerQuantityDialog = () => {
    this.setState({
      isTrailerQuantityDialogVisible: true,
    });
  };

  hideTrailerQuantityDialog = () => {
    this.setState({
      isTrailerQuantityDialogVisible: false,
    });
  };

  onValueChange = (field, value) => {
    this.props.dispatch(CUSTOMER_ACTIONS.setAddData(field, value));

    if (field == 'packaging_id') {
      this.showPackageDimensionDialog();
    }

    if (field == 'trailer_id') {
      this.showTrailerQuantityDialog();
    }
  };

  updatePasses = id => {
    let {security_passes} = this.props.loadData.attributes;
    let passes = security_passes.includes(id)
        ? security_passes.filter(value => value !== id)
        : security_passes.concat(id);
    this.props.dispatch(CUSTOMER_ACTIONS.setAddData('security_passes', passes));
  };

  onPackagingDimensionsFieldChange = (field, name) => {
    let {packaging_dimension} = this.props.loadData.attributes;
     let packagingDimension = {
        ...packaging_dimension,
        [field]: name,
      };
    this.props.dispatch(CUSTOMER_ACTIONS.setAddData('packaging_dimension', packagingDimension));
  };

  onLoadPassSearch = searchTerm => {};

  onSaveButtonPress = () => {
    console.log('@todo save');

    // return new Promise((resolve, reject) => {
    //   this.props.dispatch(CUSTOMER_ACTIONS.saveLoad({params, resolve}));
    //   // dispatch(someActionCreator({ values, resolve, reject }))
    // }).then(() => {});

    // on Success
    this.showSuccessModalDialog();
  };


  showMatchingDrivers = () => {
    this.hideSuccessModalDialog();
    this.props.navigation.navigate('LoadDetail', {
      loadID: 1,
    });
  };

  render() {
    let {
      isPackageDimensionDialogVisible,
      isTrailerQuantityDialogVisible,
      isSuccessDialogVisible,
    } = this.state;

    let {
      load_time,
      packaging_id,
      trailer_id,
      weight,
      request_documents,
      use_own_truck,
      security_passes,
      receiver_email,
      receiver_mobile,
      receiver_phone,
      receiver_name,
      origin_location_id,
      destination_location_id,
      trailer_quantity,
      packaging_dimension,
    } = this.props.loadData.attributes;

    console.log('loadData', this.props.loadData);

    let {trailers, packaging, securityPasses, locations} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <Tabs activeIndex={5}>
          <TabList>
            <TabHeader title={I18n.t('load_info')} />
            <TabHeader title={I18n.t('load_location')} />
            <TabHeader title={I18n.t('date')} />
            <TabHeader title={I18n.t('documents')} />
            <TabHeader title={I18n.t('security_passes')} />
            <TabHeader title={I18n.t('receiver_information')} />
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
                visible={isPackageDimensionDialogVisible}
                onValueChange={this.onPackagingDimensionsFieldChange}
                onCancel={this.hidePackageDimensionDialog}
                onConfirm={this.hidePackageDimensionDialog}
                {...packaging_dimension}
              />

              <TrailerQuantity
                visible={isTrailerQuantityDialogVisible}
                onValueChange={quantity =>
                  this.onValueChange('trailer_quantity', quantity)
                }
                onCancel={this.hideTrailerQuantityDialog}
                onConfirm={this.hideTrailerQuantityDialog}
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
                items={securityPasses}
                activeIDs={security_passes}
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

        <Dialog
          visible={isSuccessDialogVisible}
          rightPress={this.showMatchingDrivers}
          title={I18n.t('success')}
          description={I18n.t('load_create_success')}
          rightText={I18n.t('view_matching_drivers')}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadData: CUSTOMER_SELECTORS.getAddData(state),
    trailers: TRUCK_SELECTORS.getTrailerTypes(state),
    packaging: TRUCK_SELECTORS.getPackaging(state),
    securityPasses: TRUCK_SELECTORS.getSecurityPasses(state),
    locations: CUSTOMER_SELECTORS.getLocations(state),
  };
}

export default connect(mapStateToProps)(LoadAddScene);
