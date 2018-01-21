import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, Text} from 'react-native';

import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';

import TabHeader from 'shipper/loads/components/TabHeader';
import LoadWhat from 'shipper/loads/components/LoadWhat';
import LoadWhere from 'shipper/loads/components/LoadWhere';
import LoadWhen from 'shipper/loads/components/LoadWhen';
import LoadHow from 'shipper/loads/components/LoadHow';
import Button from '../../components/Button';
import moment from 'moment';

class LoadAddScene extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    load_date:undefined
  };

  componentDidMount() {}

  onPickLocationsListPress = () => {
    console.log('pick');
    this.props.navigation.navigate('LocationList', {
      type: 'pick',
    });
  };

  onDropLocationsListPress = () => {
    console.log('drop');
    this.props.navigation.navigate('LocationList', {
      type: 'drop',
    });
  };

  onPickLocationItemPress = () => {

  };

  onFieldChange = (field, value) => {
    if (value) {
      // let record;
      // const {makes, models} = this.props;
      // switch (field) {
      //   case 'make':
      //     record = makes.find(record => record.id === value);
      //     break;
      //   case 'model':
      //     record = models.find(record => record.id === value);
      //     break;
      //   default:
      //     record = value;
      //     break;
      // }
      this.setState({[field]: value});
    }
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Tabs>
          <TabList>
            <TabHeader title="1" />
            <TabHeader title="2" />
            <TabHeader title="3" />
            <TabHeader title="4" />
            <TabHeader title="5" />
            <TabHeader title="6" />
          </TabList>

          <TabPanels>
            <LoadWhat />

            <LoadWhere
              pickLocation={{
                address: '5823 Olin Crescent↵Hilpertport, NV 36582-2290',
                city: 'Lake Jadonshire',
                country: {id: 1, name: 'Kuwait'},
                id: 4,
                latitude: 29.66,
                longitude: 47.1,
                state: 'Kassulkeland',
                type: 'pick',
              }}
              onPickLocationsListPress={this.onPickLocationsListPress}
              onDropLocationsListPress={this.onDropLocationsListPress}

              onPickLocationItemPress={this.onPickLocationItemPress}

            />

            <LoadWhen
              load_date={this.state.load_date}
              onFieldChange={this.onFieldChange}
            />
            <LoadHow />
          </TabPanels>
        </Tabs>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoadAddScene);
