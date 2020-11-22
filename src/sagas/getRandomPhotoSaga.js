import { takeLatest, put, call} from "redux-saga/effects";
import pexelsClient from './utilsClient/utils'

function* GetDataAsync() {
    try {   
        const data = yield call(() => pexelsClient.getCuratedPhotos(10, 1)); 
        yield put({ type: 'PUT_RANDOM_PHOTO_COLLECTION', payload:data.photos[Math.floor(Math.random() * 10)]})
    }
    catch (error) {
        console.log(error);
}
}

export function* watchGetRandomPhoto() {	
  yield takeLatest('GET_RANDOM_PHOTO_COLLECTION', GetDataAsync);
}