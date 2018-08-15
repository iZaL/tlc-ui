import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'app/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {getFileExtension, getFileName} from 'utils/functions';

function* uploadImages(action) {
  const {images, reject, resolve} = action.params;
  try {
    const formData = new FormData();

    images.map(img => {
      formData.append('images[]', {
        uri: img,
        name: getFileName(img),
        type: getFileExtension(img),
      });
    });

    const params = {
      body: formData,
      isBlob: true,
    };

    const response = yield call(API.uploadImages, params);
    yield resolve(response.data);
    yield put({
      type: ACTION_TYPES.UPLOAD_IMAGES_SUCCESS,
    });
  } catch (error) {
    yield reject(error);
    yield put({type: ACTION_TYPES.UPLOAD_IMAGES_FAILURE, error});
  }
}

function* saveUploads(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };
    const response = yield call(API.saveUploads, params);
    yield put({
      type: ACTION_TYPES.SAVE_UPLOADS_SUCCESS,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_UPLOADS_FAILURE, error});
  }
}

function* uploadImageMonitor() {
  yield takeLatest(ACTION_TYPES.UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* saveUploadsMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_UPLOADS_REQUEST, saveUploads);
}

export const sagas = all([fork(uploadImageMonitor), fork(saveUploadsMonitor)]);
