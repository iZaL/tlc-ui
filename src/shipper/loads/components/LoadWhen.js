import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from 'components/FormLabel';
import DateTimePicker from 'components/DateTimePicker';
import I18n from 'utils/locale';
import DatePicker from 'components/DatePicker';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';

export default class LoadWhat extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    load_time: PropTypes.string,
  };

  render() {
    let {load_time, onFieldChange} = this.props;

    return (
      <ScrollView>
        <FormLabel title={I18n.t('load_date')} />

        <DatePicker onDateChange={date => onFieldChange('load_date', date)} />

        <Separator
          style={{marginVertical: 10, backgroundColor: colors.mediumGrey}}
        />

        <FormLabel title={I18n.t('load_time')} />

        <View style={styles.timePickerContainer}>
          <DateTimePicker
            date={load_time}
            mode="time"
            placeholder={I18n.t('select')}
            confirmBtnText={I18n.t('confirm')}
            cancelBtnText={I18n.t('cancel')}
            onDateChange={time => onFieldChange('load_time', time)}
            customStyles={{
              dateText: styles.dateText,
              placeholderText: styles.placeholderText,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.primary,
  },
  placeholderText: {
    fontSize: 30,
    fontWeight: '500',
  },
  timePickerContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 30,
    padding: 5,
  },
});
