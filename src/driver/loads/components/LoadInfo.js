/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';
import LoadInfoItem from 'driver/loads/components/LoadInfoItem';
import {Caption, TouchableRipple} from 'react-native-paper';
import Modal from 'components/Modal';
import Gallery from 'components/Gallery';

export default class LoadInfo extends Component {
  static propTypes = {
    load: PropTypes.object.isRequired,
    showDetail: PropTypes.bool,
  };

  state = {
    packagingDetailVisible: false,
  };

  static defaultProps = {
    load: {
      trailer: {},
      showDetail: false,
    },
  };

  shouldComponentUpdate(nextProps, prevState) {
    return nextProps.load !== this.props.load || prevState !== this.state;
  }

  render() {
    let {load, style, showDetail} = this.props;
    let {packaging, packaging_dimension, packaging_images} = load;

    if (!packaging_dimension) {
      packaging_dimension = {};
    }

    if (!packaging_images) {
      packaging_images = [];
    }

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
            title={I18n.t('rate')}
            description={load.trip ? load.trip.rate_formatted : '-'}
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

          <LoadInfoItem
            title={I18n.t('status')}
            description={
              load.trip ? load.trip.status_formatted : load.status_formatted
            }
          />
        </View>

        {showDetail && (
          <View>
            <View style={[styles.itemRowContainer, {marginTop: 10}]}>
              <LoadInfoItem
                title={I18n.t('weight')}
                description={load.weight_formatted}
              />

              <LoadInfoItem
                title={I18n.t('commodity')}
                description={load.commodity ? load.commodity.name : '-'}
              />

              <LoadInfoItem
                title={I18n.t('packaging')}
                description={packaging ? packaging.name : '-'}
                caption={
                  packaging ? (
                    <TouchableRipple
                      onPress={() =>
                        this.setState({packagingDetailVisible: true})
                      }>
                      <Caption>{I18n.t('view_info')}</Caption>
                    </TouchableRipple>
                  ) : (
                    ''
                  )
                }
              />
            </View>

            <View style={[styles.itemRowContainer, {marginTop: 10}]}>
              <LoadInfoItem
                title={I18n.t('distance')}
                description={load.trip_distance}
              />

              <LoadInfoItem
                title={I18n.t('duration')}
                description={load.trip_duration}
              />
            </View>

            <Modal
              visible={this.state.packagingDetailVisible}
              onCancel={() => this.setState({packagingDetailVisible: false})}
              onSave={() => this.setState({packagingDetailVisible: false})}
              header={I18n.t('packaging_info')}
              buttonText={I18n.t('close')}>
              <View style={[styles.container]}>
                <View style={[styles.itemRowContainer, {marginTop: 10}]}>
                  <LoadInfoItem
                    title={I18n.t('length')}
                    description={packaging_dimension.length_formatted}
                  />
                  <LoadInfoItem
                    title={I18n.t('width')}
                    description={packaging_dimension.width_formatted}
                  />
                  <LoadInfoItem
                    title={I18n.t('height')}
                    description={packaging_dimension.height_formatted}
                  />
                  <LoadInfoItem
                    title={I18n.t('weight')}
                    description={packaging_dimension.weight}
                    caption={I18n.t('tons').toLowerCase()}
                  />
                  <LoadInfoItem
                    title={I18n.t('quantity')}
                    description={packaging_dimension.quantity}
                  />
                </View>
              </View>

              <Gallery images={packaging_images} imageName={item => item.url} />
            </Modal>
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
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
