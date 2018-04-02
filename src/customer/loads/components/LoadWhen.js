import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from 'components/FormLabel';
import I18n from 'utils/locale';
import DatePicker from 'components/DatePicker';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Button} from 'react-native-paper';
import moment from 'moment';

export default class LoadWhat extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    load_time: PropTypes.object,
    // onCancel:PropTypes.func.isRequired,
    // visible:PropTypes.bool.isRequired
  };

  state = {
    showTimePicker: false,
  };

  showTimePicker = () => {
    this.setState({
      showTimePicker: true,
    });
  };

  hideTimePicker = () => {
    this.setState({
      showTimePicker: false,
    });
  };

  onTimeChange = time => {
    let selectedTime = moment(time);
    this.props.onFieldChange('load_time', selectedTime);
  };

  render() {
    let {load_time, onFieldChange} = this.props;
    let {showTimePicker} = this.state;

    return (
      <ScrollView>
        <FormLabel title={I18n.t('load_date')} />

        <DatePicker onDateChange={date => onFieldChange('load_date', date)} />

        <Separator
          style={{marginVertical: 10, backgroundColor: colors.mediumGrey}}
        />

        <Button raised onPress={this.showTimePicker}>
          <Text style={{fontSize: 20}}>{load_time.format('h:mm a')}</Text>
        </Button>

        <DateTimePicker
          isVisible={showTimePicker}
          date={load_time.toDate()}
          mode="time"
          titleIOS={I18n.t('select_time')}
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={this.onTimeChange}
          onCancel={this.hideTimePicker}
          onConfirm={this.hideTimePicker}
          neverDisableConfirmIOS={true}
          customStyles={{
            dateText: styles.dateText,
            placeholderText: styles.placeholderText,
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
    fontSize: 30,
    fontWeight: '500',
    color: colors.primary,
  },
  placeholderText: {
    fontSize: 30,
    fontWeight: '500',
  },
  // timePickerContainer: {
  //   backgroundColor: 'white',
  //   marginTop: 10,
  //   marginBottom: 30,
  //   padding: 5,
  // },
});
