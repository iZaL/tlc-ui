import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentList from 'components/DocumentList';
import {FAB} from 'react-native-paper';
import colors from 'assets/theme/colors';

class NationalityListScene extends Component {
  static propTypes = {
    residencies: PropTypes.array,
  };

  static defaultProps = {
    residencies: [],
  };

  // componentDidMount() {
  //   let {status} = this.props.navigation.state.params;
  //   this.props.dispatch(DRIVER_ACTIONS.fetchLoadsByStatus({status: status}));
  // }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('ResidencyDetail', {
      loadID: load.id,
    });
  };

  onAddPress = () => {
    this.props.navigation.navigate('ResidencyAdd', {});
  };

  onEditPress = () => {};

  onDeletePress = () => {};

  render() {
    let {residencies} = this.props;
    return (
      <View style={{flex: 1}}>
        <DocumentList
          items={residencies}
          onEditPress={this.onEditPress}
          onDeletePress={this.onDeletePress}
        />
        <FAB
          icon="add"
          dark
          onPress={this.onAddPress}
          medium
          style={{
            left: 20,
            bottom: 20,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    residencies: DRIVER_SELECTORS.getResidencies(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(NationalityListScene);
