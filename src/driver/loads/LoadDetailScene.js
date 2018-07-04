import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import LoadPickDropLocation from 'driver/loads/components/LoadPickDropLocation';
import Divider from 'components/Divider';
import LoadInfo from 'driver/loads/components/LoadInfo';
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
import LoadStatusButton from 'driver/loads/components/LoadStatusButton';
import LoadLocationMapView from 'driver/loads/components/LoadLocationMapView';
import LoadAddressInfo from 'driver/loads/components/LoadAddressInfo';
import colors from 'assets/theme/colors';
import {Headline} from 'react-native-paper';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {API_URL, GEOLOCATION_SOUNDS_ENABLED} from 'utils/env';
import TRACKING_CONFIG from 'utils/tracking';
import FAB from 'components/FAB';

class LoadDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
    load: PropTypes.shape({
      // origin: PropTypes.object.isRequired,
      // destination: PropTypes.object.isRequired,
    }).isRequired,
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
    isFetching: false,
    tracking_enabled: false,
  };

  componentDidMount() {
    // BackgroundGeolocation.stop();

    BackgroundGeolocation.ready(
      {
        // desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        // distanceFilter: 50,
      },
      function(state) {
        console.log('state', state);
        // console.log('- BackgroundGeolocation configured and ready');
        // if (!state.enabled) {  // <-- current state provided to callback
        //   BackgroundGeolocation.start();
        // }
      },
    );

    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadDetails({
        loadID: this.props.navigation.getParam('loadID'),
      }),
    );
  }

  setTripStatus = status => {
    this.setState({
      isFetching: true,
    });
    return new Promise((resolve, reject) => {
      let params = {
        trip_id: this.props.load.trip.id,
        status: status,
        resolve,
        reject,
      };
      this.props.dispatch(DRIVER_ACTIONS.setTripStatus(params));
    })
      .then(() => {
        this.setState({
          isFetching: false,
        });
      })
      .catch(e => {
        console.log('e', e);
        this.setState({
          isFetching: false,
        });
      });
  };

  acceptTrip = () => {
    this.setTripStatus('accept');
  };

  cancelTrip = () => {
    this.setTripStatus('cancel');
  };

  confirmTrip = () => {
    this.setTripStatus('confirm');
  };

  startTrip = () => {
    this.setTripStatus('start').then(() => {
      BackgroundGeolocation.configure({
        ...TRACKING_CONFIG,
        url: `http://${API_URL}/trips/${
          this.props.load.trip.id
          }/location/update`,
      });
      BackgroundGeolocation.start();
    });
  };

  stopTrip = () => {
    this.setTripStatus('stop').then(() => {
      BackgroundGeolocation.stop();
    });
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

  render() {
    let {load, navigation} = this.props;
    let hiddenTabs = navigation.getParam('hiddenTabs') || [];
    let {
      employeeDetailVisible,
      employeeDetail,
      imageModalVisible,
      images,
    } = this.state;
    let {origin, destination, receiver, customer, trip} = load;

    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <Tabs>
          <TabList>
            <TabHeader title={I18n.t('load_info')} />
            <TabHeader title={I18n.t('route_detail')} />
            <TabHeader title={I18n.t('customer_information')} />
            <TabHeader title={I18n.t('receiver_information')} />
            <TabHeader
              title={I18n.t('documents')}
              hidden={hiddenTabs.includes('documents')}
            />
            <TabHeader
              title={I18n.t('fleets_information')}
              hidden={hiddenTabs.includes('fleets')}
            />
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
              <LoadStatusButton
                onAccept={this.acceptTrip}
                onCancel={this.cancelTrip}
                onConfirm={this.confirmTrip}
                onStart={this.startTrip}
                onStop={this.stopTrip}
                trip={load.trip || {}}
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
              <ReceiverInfo receiver={receiver} />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <DocumentTypesList
                items={(trip && trip.documents) || []}
                onItemPress={this.onDocumentTypeListItemPress}
              />
              <FAB
                small
                primary
                icon="add"
                onPress={this.onDocumentAddPress}
              />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              {/*fleets info*/}
              <View />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <ReceiverInfo receiver={receiver} />
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
  const getLoadByID = DRIVER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      // load: getLoadByID(state, 1),
      load: getLoadByID(state, props.navigation.getParam('loadID')),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadDetailScene);
