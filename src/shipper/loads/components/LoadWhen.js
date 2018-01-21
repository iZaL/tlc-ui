import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from "components/FormLabel";
import DatePicker from "components/DatePicker";
import I18n from 'utils/locale';

export default class LoadWhat extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    load_date:PropTypes.node
  };

  static defaultProps = {
    onSelect: () => {},
  };

  render() {
    console.log('Load When');
    let {load_date,onFieldChange} = this.props;

    return (
      <ScrollView>
        <FormLabel title={I18n.t('load_date')} />

        <DatePicker
          date={load_date}
          mode="date"
          placeholder={I18n.t('select')}
          format="YYYY-MM-DD"
          minDate="2015-01-01"
          maxDate="2040-01-01"
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={date => onFieldChange('load_date', date)}
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
