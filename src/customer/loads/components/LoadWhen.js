import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import I18n from 'utils/locale';
import DatePicker from 'components/DatePicker';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Button, Title} from 'react-native-paper';
import moment from 'moment';

export default class LoadWhat extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    load_time_from: PropTypes.object,
    load_time_to: PropTypes.object,
    // onCancel:PropTypes.func.isRequired,
    // visible:PropTypes.bool.isRequired
  };

  state = {
    showTimePicker: false,
    activeTime: 'load_date_from',
  };

  showTimePicker = activeTime => {
    this.setState({
      showTimePicker: true,
      activeTime: activeTime,
    });
  };

  hideTimePicker = () => {
    this.setState({
      showTimePicker: false,
    });
  };

  onTimeChange = time => {
    let selectedTime = moment(time);
    this.props.onValueChange([this.state.activeTime], selectedTime);
  };

  getTime = () => {
    let {activeTime} = this.state;
    let {
      load_time_from,
      load_time_to,
      unload_time_from,
      unload_time_to,
      onValueChange,
    } = this.props;
    switch (activeTime) {
      case 'load_time_from':
        return load_time_from.toDate();
      case 'load_time_to':
        return load_time_to.toDate();
      case 'unload_time_from':
        return unload_time_from.toDate();
      case 'unload_time_to':
        return unload_time_to.toDate();
    }
  };

  render() {
    let {
      load_time_from,
      load_time_to,
      unload_time_from,
      unload_time_to,
      onValueChange,
      load_date,
      unload_date,
    } = this.props;
    let {showTimePicker, activeTime} = this.state;

    return (
      <View style={{padding: 10}}>
        <Title>{I18n.t('load_date')}</Title>

        <DatePicker
          activeDate={load_date}
          onDateChange={date => onValueChange('load_date', date)}
        />

        <View style={{flexDirection: 'row'}}>
          <Button
            raised
            onPress={() => this.showTimePicker('load_time_from')}
            style={{flex: 1}}>
            <View>
              <Title>{I18n.t('time_from')}</Title>
              <Text style={{fontSize: 20}}>
                {load_time_from.format('h:mm a')}
              </Text>
            </View>
          </Button>
          <Button
            raised
            onPress={() => this.showTimePicker('load_time_to')}
            style={{flex: 1}}>
            <View>
              <Title>{I18n.t('time_from')}</Title>
              <Text style={{fontSize: 20}}>
                {load_time_to.format('h:mm a')}
              </Text>
            </View>
          </Button>
        </View>

        <Divider style={{marginVertical: 20}} />
        <Title>{I18n.t('unload_date')}</Title>

        <DatePicker
          activeDate={unload_date}
          onDateChange={date => onValueChange('unload_date', date)}
        />

        <View style={{flexDirection: 'row'}}>
          <Button
            raised
            onPress={() => this.showTimePicker('unload_time_from')}
            style={{flex: 1}}>
            <View>
              <Title>{I18n.t('time_from')}</Title>
              <Text style={{fontSize: 20}}>
                {unload_time_from.format('h:mm a')}
              </Text>
            </View>
          </Button>
          <Button
            raised
            onPress={() => this.showTimePicker('unload_time_to')}
            style={{flex: 1}}>
            <View>
              <Title>{I18n.t('time_from')}</Title>
              <Text style={{fontSize: 20}}>
                {unload_time_to.format('h:mm a')}
              </Text>
            </View>
          </Button>
        </View>

        <Divider
          style={{marginVertical: 10, backgroundColor: colors.mediumGrey}}
        />

        <DateTimePicker
          isVisible={showTimePicker}
          date={this.getTime()}
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
      </View>
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
