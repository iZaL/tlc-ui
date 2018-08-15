import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import {Title} from 'react-native-paper';
import Divider from 'components/Divider';
import ListModal from 'components/ListModal';
import ListItem from 'components/ListItem';
import CameraUpload from 'components/CameraUpload';
import AlbumUpload from 'components/AlbumUpload';
import FileUpload from 'components/FileUpload';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

class DocumentAddScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number,
        }),
      }),
    }),
  };

  state: State = {
    document_type_id: null,
    typeModalVisible: false,
    uploads: [],
    amount: null,
  };

  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadDetails({
        loadID: this.props.navigation.getParam('loadID', 1),
      }),
    );
    this.props.dispatch(DRIVER_ACTIONS.fetchDocumentTypes());
  }

  setType = type => {
    this.setState({
      document_type_id: type.id,
    });
  };

  showTypeModal = () => {
    this.setState({
      typeModalVisible: true,
    });
  };

  hideTypeModal = () => {
    this.setState({
      typeModalVisible: false,
    });
  };

  onCameraUpload = image => {
    console.log('image', image);
  };

  onAlbumUpload = images => {
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
        this.setState({
          uploads: images,
        });
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  onFileUpload = file => {
    console.log('file', file);
  };

  onSave = () => {
    let {document_type_id, uploads, amount} = this.state;

    let payload = {
      uploads: this.state.uploads,
      trip_id: this.props.load.trip.id,
      document_type_id: document_type_id,
      amount: amount,
    };

    console.log('payload', payload);

    return new Promise((resolve, reject) => {
      this.props.dispatch(
        DRIVER_ACTIONS.saveTripDocuments({
          payload,
          resolve,
          reject,
        }),
      );
    })
      .then(images => {
        this.props.navigation.pop();
      })
      .catch(e => {});
  };

  render() {
    let {document_types} = this.props;
    let {document_type_id, typeModalVisible, uploads} = this.state;

    let documentType = {};

    if (document_type_id) {
      documentType =
        (document_types &&
          document_types.find(document => document.id === document_type_id)) ||
        {};
    }

    return (
      <ScrollView>
        <View style={{padding: 10}}>
          <Touchable onPress={this.showTypeModal}>
            <View>
              <Label title={I18n.t('document_type')} />
              <Title>
                {documentType.id ? documentType.name : I18n.t('select')}
              </Title>
            </View>
          </Touchable>

          <Divider style={{marginVertical: 10}} />

          <Title>{I18n.t('files')}</Title>

          <CameraUpload onUpload={this.onCameraUpload}>
            <ListItem title={I18n.t('take_picture')} />
          </CameraUpload>

          <AlbumUpload onUpload={this.onAlbumUpload} images={[]}>
            <ListItem title={I18n.t('choose_from_album')} />
          </AlbumUpload>

          <FileUpload onUpload={this.onFileUpload}>
            <ListItem title={I18n.t('upload_file')} />
          </FileUpload>
        </View>

        <Button
          title={I18n.t('save')}
          onPress={this.onSave}
          style={{marginVertical: 10}}
          disabled={!uploads.length}
        />

        <ListModal
          header={I18n.t('document_type')}
          activeIDs={[document_type_id]}
          visible={typeModalVisible}
          onItemPress={this.setType}
          onCancel={this.hideTypeModal}
          onSave={this.hideTypeModal}
          items={document_types}
        />
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = DRIVER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      document_types: DRIVER_SELECTORS.getDocumentTypes(state),
      load: getLoadByID(state, props.navigation.getParam('loadID', 1)),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(DocumentAddScene);
