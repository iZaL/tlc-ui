import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import Divider from 'components/Divider';
import ListItem from 'components/ListItem';
import {List, Title} from 'react-native-paper';
import I18n from 'utils/locale';
import AlbumUpload from 'components/AlbumUpload';
import {View} from 'react-native';
import IconFactory from 'components/IconFactory';
import colors from 'assets/theme/colors';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import Gallery from 'components/Gallery';

class TruckUpdateScene extends Component {
  static propTypes = {
    truck: PropTypes.shape({
      model: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    truck: {
      model: {},
    },
  };

  state = {
    images: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  loadTruckRegistrationScene = () => {
    this.props.navigation.navigate('TruckRegistration');
  };

  loadTruckModelScene = () => {
    this.props.navigation.navigate('TruckModel', {
      truck: this.props.truck,
    });
  };

  loadTruckInfoUpdateScene = () => {
    this.props.navigation.navigate('TruckInfoUpdate', {
      truck: this.props.truck,
    });
  };

  loadTrailerUpdateScene = () => {
    this.props.navigation.navigate('TrailerUpdate');
  };

  uploadImages = images => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(
        APP_ACTIONS.uploadImages({
          images,
          resolve,
          reject,
        }),
      );
    })
      .then(images => {
        this.props.dispatch(
          APP_ACTIONS.saveUploads({
            links: images,
            entity_type: 'Truck',
            entity_id: this.props.truck.id,
          }),
        );
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  render() {
    let {truck} = this.props;

    return (
      <List.Section>
        <ListItem
          onPress={this.loadTruckModelScene}
          title={I18n.t('truck_model')}
          name="truck_model"
        />

        <Divider />

        <ListItem
          onPress={this.loadTruckRegistrationScene}
          name="truck_registration"
          title={I18n.t('truck_registration')}
        />

        <Divider />

        <ListItem
          onPress={this.loadTruckInfoUpdateScene}
          name="truck_details"
          title={I18n.t('truck_details')}
        />

        <Divider />

        {/*<ListItem*/}
        {/*onPress={this.loadTrailerUpdateScene}*/}
        {/*name="trailer_details"*/}
        {/*title={I18n.t('trailer_details')}*/}
        {/*/>*/}

        <Gallery images={truck.images} imageName={image => image.url} />

        <Divider style={{marginBottom: 20}} />

        <AlbumUpload images={this.state.images} onUpload={this.uploadImages}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Title style={{textAlign: 'center'}}>
              {I18n.t('upload_images')}
            </Title>
            <IconFactory
              type="MaterialIcons"
              name="add-a-photo"
              size={40}
              color={colors.darkGrey}
            />
          </View>
        </AlbumUpload>
      </List.Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
  };
}

export default connect(mapStateToProps)(TruckUpdateScene);
