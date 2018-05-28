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
import {FAB, Headline} from 'react-native-paper';
import EmployeeList from 'customer/employees/components/EmployeeList';
import Dialog from 'components/Dialog';
import DocumentTypesList from 'components/DocumentTypesList';
import ImageViewer from 'components/ImageViewer';
import LoadStatusButton from 'driver/loads/components/LoadStatusButton';
import LoadLocationMapView from 'driver/loads/components/LoadLocationMapView';
import colors from 'assets/theme/colors';

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
      origin: PropTypes.object.isRequired,
      destination: PropTypes.object.isRequired,
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
  };

  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadDetails({
        loadID: this.props.navigation.getParam('loadID'),
        // loadID: 1,
      }),
    );
  }

  acceptTrip = () => {

  };

  loadTripMapScene = () => {
    this.props.navigation.navigate('TripTrack', {
      tripID: 1,
    });
  };

  onUserInfoPress = () => {};

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
    console.log('calling');
  };

  onEmployeeMobileNumberPress = () => {
    console.log('calling');
  };

  onDocumentAddPress = () => {
    this.props.navigation.navigate('DocumentAdd', {
      loadID: this.props.load.id,
    });
  };

  onDocumentTypeListItemPress = (item: object) => {
    console.log('ite', item);
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
    console.log('load', load);

    let {origin, destination, receiver, pending_fleets, customer, trip} = load;

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
              <View style={{flex: 1, backgroundColor: 'white'}}>
                {origin &&
                destination && (
                  <View style={{flex: 1}}>
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
                      trip={load.trip || {}}
                    />

                  </View>
                )}
              </View>
            </TabPanel>

            <TabPanel hideNextButton={true}>
              <View style={{height: 200, backgroundColor: colors.lightGrey}}>
                <LoadLocationMapView
                  origin={load.origin}
                  destination={load.destination}
                />
              </View>
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
              {receiver ? (
                <ReceiverInfo
                  name={receiver.name}
                  email={receiver.email}
                  phone={receiver.phone}
                  mobile={receiver.mobile}
                />
              ) : (
                <View />
              )}

              <View />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              {/*upload documents*/}
              <DocumentTypesList
                items={(trip && trip.documents) || []}
                onItemPress={this.onDocumentTypeListItemPress}
              />
              <View style={{flex: 1}}>
                <FAB
                  small
                  primary
                  icon="add"
                  onPress={this.onDocumentAddPress}
                />
              </View>
            </TabPanel>

            <TabPanel hideNextButton={true}>
              {/*fleets info*/}

              <View />
            </TabPanel>

            <TabPanel hideNextButton={true}>
              {/*contact tlc*/}
              {receiver ? (
                <ReceiverInfo
                  name={receiver.name}
                  email={receiver.email}
                  phone={receiver.phone}
                  mobile={receiver.mobile}
                />
              ) : (
                <View />
              )}
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
