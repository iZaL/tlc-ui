import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView} from "react-native";
import DocumentCountriesList from "driver/routes/components/DocumentCountriesList";

class UploadDocuments extends Component {
  static propTypes = {
    countries: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  };

  static defaultProps = {
    countries: []
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  toggleItem = (item: object) => {
    this.props.dispatch(
      DRIVER_ACTIONS.saveRoute({
        route_id: item.id,
      }),
    );
  };

  onItemIconPress = item => {
    this.toggleItem(item);
  };

  onCardListItemPress = item => {
    this.props.navigation.navigate('UploadDocuments', {
      countryID: item.id,
    });
  };

  onDocumentCountriesListItemPress = () => {

  };

  render() {
    const {countries} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <DocumentCountriesList items={countries} onItemPress={this.onDocumentCountriesListItemPress}/>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    countries: DRIVER_SELECTORS.getProfileCountries(state),
  };
}

export default connect(mapStateToProps)(UploadDocuments);
