import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import I18n from 'utils/locale';

type STATUS = 'pending|working|confirmed|completed';

class LoadListScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          status: PropTypes.string,
        }),
      }),
    }).isRequired,
    loads: PropTypes.array,
  };

  static defaultProps = {
    loads: [],
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('title',I18n.t('trips')),
    };
  };

  componentDidMount() {
    let status = this.props.navigation.getParam('status','pending');
    this.props.dispatch(DRIVER_ACTIONS.fetchLoadsByStatus({status: status}));
  }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {loads} = this.props;
    return <LoadsList items={loads} onItemPress={this.onLoadsListItemPress} />;
  }
}

const makeMapStateToProps = () => {
  const getLoadsByStatus = DRIVER_SELECTORS.getLoadsByStatus();
  const mapStateToProps = (state, props) => {
    let status = props.navigation.getParam('status');
    console.log('status',status);
    return {
      loads:
        getLoadsByStatus(state, status) || [],
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadListScene);
