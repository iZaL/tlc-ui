import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {Modal, View} from 'react-native';
import RoutesList from 'driver/routes/components/RoutesList';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import AddRoute from 'driver/routes/components/AddRoute';

class UpdateRoutesScene extends Component {
  static propTypes = {};

  state = {
    showModal: false,
    activeItemIDs: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  componentWillReceiveProps(nextProps) {
    const {user: {profile: {routes}}} = nextProps;
    routes &&
      this.setState({
        activeItemIDs: routes.map(route => route.id),
      });
  }

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  toggleItem = (item: object) => {
    console.log('item', item);

    this.props.dispatch(
      DRIVER_ACTIONS.saveRoute({
        route_id: item.id,
      }),
    );
  };

  onItemAddPress = item => {
    console.log('add item');

    if (this.state.activeItemIDs.includes(item.id)) {
      console.log('has item');

      this.setState({
        activeItemIDs: this.state.activeItemIDs.filter(id => id !== item.id),
      });
    }
    this.toggleItem(item);
  };

  onRoutesListItemPress = item => {
    this.props.navigation.navigate('RoutesDetail', {
      routeID: item.id,
    });
  };

  render() {
    const {user: {profile: {available_routes}}} = this.props;

    const {activeItemIDs} = this.state;
    return (
      <View style={{flex: 1}}>
        <RoutesList
          items={available_routes || []}
          onPress={this.onRoutesListItemPress}
          onItemAddPress={this.onItemAddPress}
          onItemRemovePress={this.onItemAddPress}
          activeItemIDs={activeItemIDs}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(UpdateRoutesScene);
