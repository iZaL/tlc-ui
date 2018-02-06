import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import I18n from 'utils/locale';

type STATUS = 'working|confirmed|completed';

class LoadListScene extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const status = params && params.status || null;
    let title = status ? `load_${status}_list` : 'loads' ;
    console.log('title',title);
    return {
      title: I18n.t(title) ,
    }
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          status: PropTypes.string,
        }),
      }),
    }).isRequired,
    loads:PropTypes.array
  };

  static defaultProps = {
    // status: 'working',
    loads:[]
  };

  componentDidMount() {
    let {status} = this.props.navigation.state.params;
    this.props.dispatch(SHIPPER_ACTIONS.fetchLoadsByStatus({status:status}));
  }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('LoadDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {loads} = this.props;
    return (
        <LoadsList
          items={loads}
          onItemPress={this.onLoadsListItemPress}
        />
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadsByStatus = SHIPPER_SELECTORS.getLoadsByStatus();
  const mapStateToProps = (state, props) => {
    return {
      loads: getLoadsByStatus(state, props.navigation.state.params.status) || [],
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LoadListScene);