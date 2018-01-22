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
    onSelect: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
    load_time: PropTypes.string,
  };

  static defaultProps = {
    onSelect: () => {},
  };

  render() {
    let {onDateChange, load_time, onTimeChange} = this.props;

    return (
      <ScrollView>
        <FormLabel title={I18n.t('load_date')} />

        <DatePicker onDateChange={onDateChange} />

        <Separator
          style={{marginVertical: 10, backgroundColor: colors.mediumGrey}}
        />

        <FormLabel title={I18n.t('load_time')} />

        <DateTimePicker
          date={load_time}
          mode="time"
          placeholder={I18n.t('select')}
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={onTimeChange}
          customStyles={{
            dateText: styles.dateText,
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
