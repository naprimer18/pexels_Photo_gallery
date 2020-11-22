import { takeLatest, put, call} from "redux-saga/effects";
import pexelsClient from './utilsClient/utils'

function* GetDataAsync() {
  try {   
    const data = yield call(() =>  pexelsClient.getPopularPhotos(80, 1)); 
    yield put({ type: 'PUT_PHOTO_COLLECTION', payload:data})
  }   
  catch (error) {
    console.log(error);
}
}

export function* watchGetOriginPhoto() {	
  yield takeLatest('GET_PHOTO_COLLECTION', GetDataAsync);
}
