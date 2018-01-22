import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from "components/FormLabel";
import DateTimePicker from "components/DateTimePicker";
import I18n from 'utils/locale';
import DatePicker from "../../../components/DatePicker";

export default class LoadWhat extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSelect: () => {},
  };

  render() {
    let {onFieldChange} = this.props;

    return (
      <ScrollView>
        <FormLabel title={I18n.t('load_date')} />

        <DatePicker
          onDateChange={onFieldChange}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
