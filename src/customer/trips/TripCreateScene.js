import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import DriversList from 'customer/loads/components/DriversList';
import Dialog from 'components/Dialog';
import I18n from 'utils/locale';
import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';
import TabHeader from 'customer/loads/components/TabHeader';
import TabPanel from 'customer/loads/components/TabPanel';
import DriverInfo from 'driver/components/DriverInfo';
import TruckInfo from 'trucks/components/TruckInfo';
import TrailerInfo from 'trucks/components/TrailerInfo';
import Map from 'customer/trips/components/Map';
import Modal from "../../components/Modal";

class TripCreateScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
  };

  state = {
    selectedDriverID: null,
    dialogVisible: false,
    dialogTitle: null,
    driverDetailModalVisible:false
  };

  componentDidMount() {
    // let {loadID} = this.props.navigation.state.params;
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadBookableDrivers({
        // loadID: loadID,
        loadID: 1,
      }),
    );
  }

  onDriverListItemPress = (item: object) => {
    this.setState({
      selectedDriverID: item.id,
      driverDetailModalVisible:true
    });
    // this.showDialog({title: `${I18n.t('confirm')} ${item.user.name}`});
  };

  showDialog = ({title}) => {
    this.setState(
      {
        dialogTitle: title,
        dialogVisible: true,
      },
      () => {
        // this.setState({
        //   dialogVisible:true
        // })
      },
    );
  };

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      dialogTitle: null,
      selectedDriverID: null,
    });
  };

  hideDriverDetailDialog = () => {
    this.setState({
      driverDetailModalVisible:false
    })
  }

  onDriverConfirm = () => {
    console.log('@todo: save');
    this.hideDialog();
  };

  render() {
    let {load} = this.props;
    let {driverDetailModalVisible,selectedDriverID} = this.state;
    
    let driver = {};
    
    if(selectedDriverID) {
      driver = load.bookable_drivers.find(id => selectedDriverID);
    }

    console.log('driver',driver);
    if (load.id) {
      return (
        <ScrollView style={{flex: 1}}>
          <DriversList
            onItemPress={this.onDriverListItemPress}
            items={load.bookable_drivers || []}
          />
          <Dialog
            leftPress={this.hideDialog}
            rightPress={this.onDriverConfirm}
            leftText={I18n.t('cancel')}
            visible={this.state.dialogVisible}
            title={this.state.dialogTitle}
          />
          
          <Modal
            visible={driverDetailModalVisible}
            onCancel={this.hideDriverDetailDialog}
            buttonText={I18n.t('select')}
            onSave={this.hideDriverDetailDialog}
          >
            <ScrollView style={{flex: 1}}>
              <Tabs>
                <TabList>
                  <TabHeader title={I18n.t('driver')} />
                  <TabHeader title={I18n.t('truck')} />
                  <TabHeader title={I18n.t('trailer')} />
                  {/*<TabHeader title={I18n.t('track')} />*/}
                </TabList>

                <TabPanels>
                  <TabPanel hideNextButton={true}>
                    {driver ? <DriverInfo driver={driver} /> : <View />}
                  </TabPanel>

                  <TabPanel hideNextButton={true}>
                    {driver && driver.truck ? (
                      <TruckInfo truck={driver.truck} />
                    ) : (
                      <View />
                    )}
                  </TabPanel>

                  <TabPanel hideNextButton={true}>
                    {driver &&
                    driver.truck &&
                    driver.truck.trailer ? (
                      <TrailerInfo trailer={driver.truck.trailer} />
                    ) : (
                      <View />
                    )}
                  </TabPanel>

                  {/*<TabPanel hideNextButton={true} >*/}
                  {/*<Map*/}
                  {/*origin={origin}*/}
                  {/*destination={{*/}
                  {/*latitude: address.latitude,*/}
                  {/*longitude: address.longitude,*/}
                  {/*}}*/}
                  {/*style={{*/}
                  {/*height:500*/}
                  {/*}}*/}
                  {/*/>*/}
                  {/*</TabPanel>*/}

                </TabPanels>
              </Tabs>
            </ScrollView>

          </Modal>

        </ScrollView>


      );
    }

    return null;
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = CUSTOMER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, 1),
      // load: getLoadByID(state, props.navigation.state.params.loadID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TripCreateScene);
