/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import LoadInfoItem from 'driver/loads/components/LoadInfoItem';

export default class LoadInfo extends Component {
  static propTypes = {
    load: PropTypes.object.isRequired,
    showDetail: PropTypes.bool,
  };

  static defaultProps = {
    load: {
      trailer: {},
      showDetail: false,
    },
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.load !== this.props.load;
  }

  render() {
    let {load, style, showDetail} = this.props;
    return (
      <View style={[styles.container, style]}>

        <View style={[styles.itemRowContainer]}>

          <LoadInfoItem
            title={I18n.t('load_identifier')}
            description={load.track_id}
          />

          <LoadInfoItem
            title={I18n.t('trailer')}
            description={load.trailer_type ? load.trailer_type.name : ''}
          />

          <LoadInfoItem
            title={I18n.t('weight')}
            description={load.weight_formatted}
          />

        </View>

        <View style={[styles.itemRowContainer]}>

          <LoadInfoItem
            title={I18n.t('pick_up')}
            description={load.load_date_formatted}
            caption={load.load_time_formatted}
          />

          <LoadInfoItem
            title={I18n.t('drop_off')}
            description={load.unload_date_formatted}
            caption={load.unload_time_formatted}
          />

          <LoadInfoItem title={I18n.t('rate')} description={load.trip ? load.trip.rate_formatted : '-'} />

        </View>

        {showDetail && (
          <View style={[styles.itemRowContainer, {marginTop: 10}]}>

            <LoadInfoItem
              title={I18n.t('commodity')}
              description={load.packaging ? load.packaging.name : '-'}
            />

            <LoadInfoItem
              title={I18n.t('packaging')}
              description={load.packaging ? load.packaging.name : '-'}
            />

            <LoadInfoItem
              title={I18n.t('status')}
              description={load.trip ? load.trip.status_formatted : '-'}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
