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
    camera_uploads: [],
    album_uploads: [],
    file_uploads: [],
  };

  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchLoadDetails({
        loadID: this.props.navigation.getParam('loadID',1),
      }),
    );
    this.props.dispatch(DRIVER_ACTIONS.fetchDocumentTypes());
  }

  setType = type => {
    this.setState({
      document_type_id: type.id,
    });
  };

  onSave = () => {
    console.log('save');
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
    console.log('images', images);
  };

  onFileUpload = file => {
    console.log('file', file);
  };

  render() {
    let {document_types} = this.props;
    let {document_type_id, typeModalVisible} = this.state;

    let documentType = {};

    if (document_type_id) {
      documentType = document_types.find(
        document => document.id === document_type_id,
      );
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

          <AlbumUpload
            onUpload={this.onAlbumUpload}
            images={this.state.album_uploads}>
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
      load: getLoadByID(state, props.navigation.getParam('loadID',1)),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(DocumentAddScene);
