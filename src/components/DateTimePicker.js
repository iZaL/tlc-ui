import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  DatePickerAndroid,
  DatePickerIOS,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TimePickerAndroid,
  TouchableHighlight,
  View,
} from 'react-native';

import Moment from 'moment';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

const FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  time: 'HH:mm',
};

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true,
    };

    this.getDate = this.getDate.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onTimePicked = this.onTimePicked.bind(this);
    this.onDatetimePicked = this.onDatetimePicked.bind(this);
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({date: this.getDate(nextProps.date)});
    }
  }

  setModalVisible(visible) {
    const {height, duration} = this.props;

    // slide animation
    if (visible) {
      this.setState({modalVisible: visible});
      return Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration,
      }).start();
    } else {
      return Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: duration,
      }).start(() => {
        this.setState({modalVisible: visible});
      });
    }
  }

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onPressMask() {
    if (typeof this.props.onPressMask === 'function') {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  getDate(date = this.props.date) {
    const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props;

    // date默认值
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = this.getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        let _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, format).toDate();
  }

  getDateStr(date = this.props.date) {
    const {mode, format = FORMATS[mode]} = this.props;

    if (date instanceof Date) {
      return Moment(date).format(format);
    } else {
      return Moment(this.getDate(date)).format(format);
    }
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(
        this.getDateStr(this.state.date),
        this.state.date,
      );
    }
  }

  getTitleElement() {
    const {date, placeholder, customStyles} = this.props;

    if (!date && placeholder) {
      return (
        <Text style={[styles.placeholderText, customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text style={[styles.placeholderText, customStyles.dateText]}>
        {this.getDateStr()}
      </Text>
    );
  }

  onDateChange(date) {
    this.setState({
      allowPointerEvents: false,
      date: date,
    });
    const timeoutId = setTimeout(() => {
      this.setState({
        allowPointerEvents: true,
      });
      clearTimeout(timeoutId);
    }, 200);
  }

  onDatePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day),
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onTimePicked({action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment()
          .hour(hour)
          .minute(minute)
          .toDate(),
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onDatetimePicked({action, year, month, day}) {
    const {
      mode,
      androidMode,
      format = FORMATS[mode],
      is24Hour = !format.match(/h|a/),
    } = this.props;

    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date);

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: is24Hour,
        mode: androidMode,
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    } else {
      this.onPressCancel();
    }
  }

  onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute),
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onPressDate() {
    if (this.props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    // reset state
    this.setState({
      date: this.getDate(),
    });

    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {
      const {
        mode,
        androidMode,
        format = FORMATS[mode],
        minDate,
        maxDate,
        is24Hour = !format.match(/h|a/),
      } = this.props;

      // 选日期
      if (mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode,
        }).then(this.onDatePicked);
      } else if (mode === 'time') {
        // 选时间

        let timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: is24Hour,
        }).then(this.onTimePicked);
      } else if (mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode,
        }).then(this.onDatetimePicked);
      }
    }

    if (typeof this.props.onOpenModal === 'function') {
      this.props.onOpenModal();
    }
  }

  _renderIcon() {
    const {showIcon, iconSource, iconComponent, customStyles} = this.props;

    // if (showIcon) {
    //   if (iconComponent) {
    //     return iconComponent;
    //   }
    //   return (
    //     <Image
    //       style={[styles.dateIcon, customStyles.dateIcon]}
    //       source={iconSource}
    //     />
    //   );
    // }

    return null;
  }

  render() {
    const {
      mode,
      style,
      customStyles,
      disabled,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      cancelBtnText,
      confirmBtnText,
      TouchableComponent,
      testID,
      cancelBtnTestID,
      confirmBtnTestID,
    } = this.props;

    const dateInputStyle = [
      styles.dateInput,
      customStyles.dateInput,
      disabled && styles.disabled,
      disabled && customStyles.disabled,
    ];

    return (
      <TouchableComponent
        style={[styles.dateTouch, style]}
        underlayColor={'transparent'}
        onPress={this.onPressDate}
        testID={testID}>
        <View style={[styles.dateTouchBody, customStyles.dateTouchBody]}>
          <View style={dateInputStyle}>{this.getTitleElement()}</View>

          {Platform.OS === 'ios' && (
            <Modal
              transparent={true}
              animationType="none"
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(false);
              }}>
              <View style={{flex: 1}}>
                <TouchableComponent
                  style={styles.datePickerMask}
                  activeOpacity={1}
                  underlayColor={'#00000077'}
                  onPress={this.onPressMask}>
                  <TouchableComponent underlayColor={'#fff'} style={{flex: 1}}>
                    <Animated.View
                      style={[
                        styles.datePickerCon,
                        {height: this.state.animatedHeight},
                        customStyles.datePickerCon,
                      ]}>
                      <View
                        pointerEvents={
                          this.state.allowPointerEvents ? 'auto' : 'none'
                        }>
                        <DatePickerIOS
                          date={this.state.date}
                          mode={mode}
                          minimumDate={minDate && this.getDate(minDate)}
                          maximumDate={maxDate && this.getDate(maxDate)}
                          onDateChange={this.onDateChange}
                          minuteInterval={minuteInterval}
                          timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                          style={[styles.datePicker, customStyles.datePicker]}
                        />
                      </View>
                      <TouchableComponent
                        underlayColor={'transparent'}
                        onPress={this.onPressCancel}
                        style={[
                          styles.btnText,
                          styles.btnCancel,
                          customStyles.btnCancel,
                        ]}
                        testID={cancelBtnTestID}>
                        <Text
                          style={[
                            styles.btnTextText,
                            styles.btnTextCancel,
                            customStyles.btnTextCancel,
                          ]}>
                          {cancelBtnText}
                        </Text>
                      </TouchableComponent>
                      <TouchableComponent
                        underlayColor={'transparent'}
                        onPress={this.onPressConfirm}
                        style={[
                          styles.btnText,
                          styles.btnConfirm,
                          customStyles.btnConfirm,
                        ]}
                        testID={confirmBtnTestID}>
                        <Text
                          style={[
                            styles.btnTextText,
                            customStyles.btnTextConfirm,
                          ]}>
                          {confirmBtnText}
                        </Text>
                      </TouchableComponent>
                    </Animated.View>
                  </TouchableComponent>
                </TouchableComponent>
              </View>
            </Modal>
          )}
        </View>
      </TouchableComponent>
    );
  }
}

DateTimePicker.defaultProps = {
  mode: 'date',
  androidMode: 'default',
  date: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: I18n.t('confirm'),
  cancelBtnText: I18n.t('cancel'),
  iconSource: '',
  customStyles: {},

  // whether or not show the icon
  showIcon: false,
  disabled: false,
  hideText: false,
  placeholder: '',
  TouchableComponent: TouchableHighlight,
  modalOnResponderTerminationRequest: e => true,
};

DateTimePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  androidMode: PropTypes.oneOf(['calendar', 'spinner', 'default']),
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.object,
  ]),
  format: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  height: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  // iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  iconComponent: PropTypes.element,
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onDateChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  onPressMask: PropTypes.func,
  placeholder: PropTypes.string,
  modalOnResponderTerminationRequest: PropTypes.func,
  is24Hour: PropTypes.bool,
};

let styles = StyleSheet.create({
  dateTouch: {
    // width: 142
    flex: 1,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5,
  },
  dateInput: {
    flex: 1,
    // height: 40,
    // borderWidth: 1,
    // borderColor: '#aaa',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  dateText: {
    color: '#333',
  },
  placeholderText: {
    // color: '#c9c9c9'
    fontSize: 18,
    color: 'black',
    fontWeight: '300',
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077',
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden',
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98',
  },
  btnTextCancel: {
    color: '#666',
  },
  btnCancel: {
    left: 0,
  },
  btnConfirm: {
    right: 0,
  },
  datePicker: {
    marginTop: 42,
    // borderTopColor: '#ccc',
    // borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee',
  },
});
