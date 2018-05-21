import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import LoadLocationMapView from 'driver/loads/components/LoadLocationMapView';
import LoadPickDropLocation from 'driver/loads/components/LoadPickDropLocation';
import Divider from 'components/Divider';
import LoadInfo from 'driver/loads/components/LoadInfo';
import Button from 'components/Button';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';
import TabHeader from 'customer/loads/components/TabHeader';
import TabPanel from 'customer/loads/components/TabPanel';
import ReceiverInfo from 'loads/components/ReceiverInfo';
import PendingFleetsList from 'customer/trips/components/PendingFleetsList';
import TripList from 'customer/trips/components/TripList';
import UserInfo from "../../components/UserInfo";
import ListRow from "../../components/ListRow";
import {FAB, Headline} from "react-native-paper";
import EmployeeList from "../../customer/employees/components/EmployeeList";
import Dialog from "../../components/Dialog";
import DocumentTypesList from "../../components/DocumentTypesList";
import ImageViewer from 'react-native-image-zoom-viewer';

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
    employeeDetail:{},
    employeeDetailVisible:false,
    imageModalVisible:false,
    images:[]
  };


  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadDetails({
        // loadID: this.props.navigation.getParam('loadID');,
        loadID: 1,
      }),
    );
  }


  acceptBooking = () => {};

  loadTripMapScene = () => {
    this.props.navigation.navigate('TripTrack', {
      tripID: 1,
    });
  };

  onUserInfoPress = () => {

  };

  onEmployeeListItemPress = (item) => {
    console.log('item',item);
    this.setState({
      employeeDetailVisible:true,
      employeeDetail:item
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
    this.props.navigation.navigate('DocumentAdd',{
      loadID:this.props.load.id
    })
  };

  onDocumentTypeListItemPress = (item:object) => {
    console.log('ite',item);
    this.setState({
      imageModalVisible:true,
      images:[{url:item.url}]
    });
  };

  hideImageModal = () => {
    this.setState({
      imageModalVisible:false,
      images:[]
    });
  };

  render() {
    let {load} = this.props;
    let {employeeDetailVisible,employeeDetail,imageModalVisible,images} = this.state;
    console.log('load', load);
    console.log('this.state',this.state);

    let {origin, destination, receiver, pending_fleets,customer,trips,trip} = load;

    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <Tabs activeIndex={4}>
          <TabList>
            <TabHeader title={I18n.t('load_info')} />
            <TabHeader title={I18n.t('route_detail')} />
            <TabHeader title={I18n.t('customer_information')} />
            <TabHeader title={I18n.t('receiver_information')} />
            <TabHeader title={I18n.t('documents')} />
            <TabHeader title={I18n.t('fleets_information')} />
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

                    <LoadInfo load={load} style={{padding: 5}} />

                    <Divider />
                  </View>
                )}
              </View>
            </TabPanel>

            <TabPanel hideNextButton={true}>

              {/*route detail*/}

              <Divider/>

            </TabPanel>


            <TabPanel hideNextButton={true}>

              {/*customer details*/}
              {
                customer &&
                <View>
                  <UserInfo
                    style={{padding: 10}}
                    image={customer.image}
                    name={customer.name}
                    mobile={customer.mobile}
                    onPress={this.onUserInfoPress}
                  />
                  <Divider />
                  <ListRow left={I18n.t('mobile')} right={customer.mobile} onItemPress={this.onCustomerMobileNumberPress} />
                  <Divider />
                  <ListRow left={I18n.t('email')} right={customer.email} />
                  <Divider/>

                  <View style={{paddingTop:20}}>
                    <Headline style={{padding:5}}>{I18n.t('employees')}</Headline>
                    <Divider />
                    <EmployeeList items={customer.employees} onItemPress={this.onEmployeeListItemPress} />
                  </View>

                  <Dialog rightPress={this.hideEmployeeDetail} visible={employeeDetailVisible}>
                    <View>
                      <UserInfo
                        style={{padding: 10}}
                        image={employeeDetail.image}
                        name={employeeDetail.name}
                        mobile={employeeDetail.mobile}
                        onPress={this.onUserInfoPress}
                      />
                      <Divider />
                      <ListRow left={I18n.t('mobile')} right={employeeDetail.mobile} onPress={this.onEmployeeMobileNumberPress} />
                      <Divider />
                      <ListRow left={I18n.t('email')} right={employeeDetail.email} />
                      <Divider/>
                    </View>
                  </Dialog>

                </View>
              }


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
                items={trip && trip.documents || []}
                onItemPress={this.onDocumentTypeListItemPress}
              />

              <Modal visible={imageModalVisible} transparent={true} onRequestClose={this.hideImageModal}>
                <ImageViewer imageUrls={images} onSwipeDown={this.hideImageModal}/>
              </Modal>

              <View style={{flex:1}}>
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
              <View />
            </TabPanel>


          </TabPanels>
        </Tabs>
      </ScrollView>

    );
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = DRIVER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, 1),
      // load: getLoadByID(state, props.navigation.getParam('loadID')),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadDetailScene);
