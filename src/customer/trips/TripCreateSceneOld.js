import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import DriversList from 'customer/loads/components/DriversList';
import Dialog from 'components/Dialog';
import I18n from 'utils/locale';

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

  onDriverConfirm = () => {
    console.log('@todo: save');
    this.hideDialog();
  };

  render() {
    let {load} = this.props;

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
