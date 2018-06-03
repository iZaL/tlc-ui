import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';
import TabHeader from 'customer/loads/components/TabHeader';
import TabPanel from 'customer/loads/components/TabPanel';
import ReceiverInfo from 'loads/components/ReceiverInfo';
import UserInfo from 'components/UserInfo';
import ListRow from 'components/ListRow';
import EmployeeList from 'customer/employees/components/EmployeeList';
import Dialog from 'components/Dialog';
import DocumentTypesList from 'components/DocumentTypesList';
import ImageViewer from 'components/ImageViewer';
import LoadPickDropLocation from 'driver/loads/components/LoadPickDropLocation';
import LoadInfo from 'driver/loads/components/LoadInfo';
import LoadStatusButton from 'driver/loads/components/LoadStatusButton';
import LoadLocationMapView from 'driver/loads/components/LoadLocationMapView';
import LoadAddressInfo from 'driver/loads/components/LoadAddressInfo';
import colors from 'assets/theme/colors';
import {FAB, Headline} from 'react-native-paper';
import TripList from "../trips/components/TripList";
import PendingFleetsList from "../trips/components/PendingFleetsList";

class LoadDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
    load: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
  };

  state = {
    employeeDetail: {},
    employeeDetailVisible: false,
    imageModalVisible: false,
    images: [],
    isFetching:false,
  };

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadDetails({
        loadID: 1,
      }),
    );
  }

  setTripStatus = (status) => {
    this.setState({
      isFetching:true
    });
    return new Promise((resolve, reject) => {
      let params = {
        trip_id:this.props.load.trip.id,
        status:status,
        resolve,
        reject,
      };
      this.props.dispatch(CUSTOMER_ACTIONS.setTripStatus(params));
    }).then(() => {
      this.setState({
        isFetching:false
      });
    })
      .catch(e => {
        console.log('e',e);
        this.setState({
          isFetching:false
        });
      });
  };

  confirmTrip = () => {
    this.setTripStatus('confirm');
  };

  onUserInfoPress = () => {
    console.log('@todo');
  };

  onEmployeeListItemPress = item => {
    this.setState({
      employeeDetailVisible: true,
      employeeDetail: item,
    });
  };

  hideEmployeeDetail = () => {
    this.setState({
      employeeDetailVisible: false,
    });
  };

  onCustomerMobileNumberPress = () => {
    console.log('@todo');
  };

  onEmployeeMobileNumberPress = () => {
    console.log('@todo');
  };

  onDocumentAddPress = () => {
    this.props.navigation.navigate('DocumentAdd', {
      loadID: this.props.load.id,
    });
  };

  onDocumentTypeListItemPress = (item: object) => {
    this.setState({
      imageModalVisible: true,
      images: [{url: item.url}],
    });
  };

  hideImageModal = () => {
    this.setState({
      imageModalVisible: false,
      images: [],
    });
  };

  onTripListItemPress = (trip: object) => {
    this.props.navigation.navigate('TripDetail', {
      tripID: trip.id,
    });
  };

  onPendingFleetsListItemPress = () => {
    this.props.navigation.navigate('TripCreate', {
      loadID: this.props.load.id,
    });
  };

  render() {
    let {load, navigation} = this.props;
    let hiddenTabs = navigation.getParam('hiddenTabs') || [''];
    let {
      employeeDetailVisible,
      employeeDetail,
      imageModalVisible,
      images,
    } = this.state;
    let {origin, destination, receiver, customer, pending_fleets} = load;

    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>

        <Tabs>
          <TabList>
            <TabHeader title={I18n.t('load_info')} />
            <TabHeader title={I18n.t('fleets')} />
            <TabHeader title={I18n.t('route_detail')} />
            <TabHeader title={I18n.t('customer_information')} />
            <TabHeader title={I18n.t('receiver_information')} />
            <TabHeader title={I18n.t('contact')} />
          </TabList>

          <TabPanels>
            <TabPanel hideNextButton={true}>
              <LoadPickDropLocation
                origin={origin}
                destination={destination}
                style={{padding: 5}}
              />
              <Divider style={{marginVertical: 10}} />
              <LoadInfo
                load={load}
                style={{paddingHorizontal: 10}}
                showDetail={true}
              />
              <Divider />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <TripList
                items={load.trips || []}
                onItemPress={this.onTripListItemPress}
              />

              <Divider />

              <PendingFleetsList
                count={pending_fleets}
                onItemPress={this.onPendingFleetsListItemPress}
              />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <View style={{height: 200, backgroundColor: colors.lightGrey}}>
                <LoadLocationMapView
                  origin={load.origin}
                  destination={load.destination}
                />
              </View>
              <LoadAddressInfo
                origin={load.origin}
                destination={load.destination}
              />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              {/*customer details*/}
              {customer && (
                <View>
                  <UserInfo
                    style={{padding: 10}}
                    image={customer.image}
                    name={customer.name}
                    mobile={customer.mobile}
                    onPress={this.onUserInfoPress}
                  />
                  <Divider />
                  <ListRow
                    left={I18n.t('mobile')}
                    right={customer.mobile}
                    onItemPress={this.onCustomerMobileNumberPress}
                  />
                  <Divider />
                  <ListRow left={I18n.t('email')} right={customer.email} />
                  <Divider />

                  <View style={{paddingTop: 20}}>
                    <Headline style={{padding: 5}}>
                      {I18n.t('employees')}
                    </Headline>
                    <Divider />
                    <EmployeeList
                      items={customer.employees}
                      onItemPress={this.onEmployeeListItemPress}
                    />
                  </View>

                  <Dialog
                    rightPress={this.hideEmployeeDetail}
                    rightText={I18n.t('close')}
                    visible={employeeDetailVisible}>
                    <View>
                      <UserInfo
                        style={{padding: 10}}
                        image={employeeDetail.image}
                        name={employeeDetail.name}
                        mobile={employeeDetail.mobile}
                        onPress={this.onUserInfoPress}
                      />
                      <Divider />
                      <ListRow
                        left={I18n.t('mobile')}
                        right={employeeDetail.mobile}
                        onPress={this.onEmployeeMobileNumberPress}
                      />
                      <Divider />
                      <ListRow
                        left={I18n.t('email')}
                        right={employeeDetail.email}
                      />
                      <Divider />
                    </View>
                  </Dialog>
                </View>
              )}
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <ReceiverInfo
                receiver={receiver}
              />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <ReceiverInfo
                receiver={receiver}
              />
            </TabPanel>

          </TabPanels>
        </Tabs>

        <ImageViewer
          visible={imageModalVisible}
          images={images}
          onClose={this.hideImageModal}
        />
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = CUSTOMER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, 1),
      // load: getLoadByID(state, props.navigation.getParam('loadID')),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadDetailScene);
