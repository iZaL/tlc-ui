import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import moment from 'moment';

export default class DatePicker extends Component {
  static propTypes = {
    onDateChange: PropTypes.func.isRequired,
    dates: PropTypes.array,
    activeDate: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeDate: this.props.activeDate || moment(),
      dates: this.props.dates || [],
    };
  }

  componentDidMount() {
    if (!this.props.dates) {
      let dates = [];
      for (let i = 0; i < 30; i++) {
        dates.push(moment().add(i, 'days'));
      }
      this.setState({
        dates: dates,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.dates !== this.state.dates ||
      nextState.activeDate !== this.state.activeDate
    );
  }

  onDateChange = date => {
    if (!this.props.dates) {
      this.setState({
        activeDate: date,
      });
    }
    this.props.onDateChange(date);
  };

  renderItem = ({item}) => {
    const {activeDate} = this.state;
    return (
      <Touchable onPress={() => this.onDateChange(item)}>
        <View
          style={[
            styles.itemContainer,
            activeDate.format('DD/MM') === item.format('DD/MM') &&
              styles.itemContainerActive,
          ]}>
          <Text
            style={[
              styles.day,
              activeDate.format('DD/MM') === item.format('DD/MM') &&
                styles.dayActive,
            ]}>
            {item.format('ddd').toUpperCase()}
          </Text>
          <Text
            style={[
              styles.date,
              activeDate.format('DD/MM') === item.format('DD/MM') &&
                styles.dateActive,
            ]}>
            {item.date()}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    console.log('datepicker');
    const {dates, activeDate} = this.state;
    return (
      <FlatList
        data={dates}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => index}
        horizontal={true}
        extraData={activeDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginVertical:30,
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 5,
    // backgroundColor: colors.lightGrey,
  },
  itemContainer: {
    padding: 10,
    alignItems: 'center',
  },
  day: {
    color: colors.darkGrey,
    fontSize: 15,
  },
  date: {
    fontSize: 29,
    color: colors.darkGrey,
  },
  itemContainerActive: {
    backgroundColor: colors.primary,
  },
  dayActive: {
    color: colors.white,
  },
  dateActive: {
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
