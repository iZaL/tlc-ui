import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import LoadsList from "driver/loads/components/LoadsList";
import {SELECTORS as DRIVER_SELECTORS} from "driver/common/selectors";

class Home extends Component {

  static propTypes = {
    loads: PropTypes.array.isRequired
  };

  static defaultProps = {
    loads:[]
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchLoadRequests());
  }

  onLoadsListItemPress = (load:object) => {
    console.log('lo',load);

    this.props.navigation.navigate('LoadsDetail',{
      loadID:load.id
    })
  };

  render() {
    let {loads} = this.props;
    return (
      <View
        style={{flex: 1}}>
        <LoadsList items={loads} onItemPress={this.onLoadsListItemPress} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loads:DRIVER_SELECTORS.getLoadRequests(state),
  };
}

export default connect(mapStateToProps)(Home);
