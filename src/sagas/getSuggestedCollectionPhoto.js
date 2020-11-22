import { takeEvery , put, call } from "redux-saga/effects";
import pexelsClient from './utilsClient/utils'

function* GetDataAsync(param) {
	try {   
        let data = yield call(() => pexelsClient.search(param.payload,10,1)); // limit); 
        yield put({ type: 'PUT_PHOTO_COLLECTION', payload:data})
    }
    catch (error) {
        console.log(error);
    }
}

export function* watchGetSuggestedCollectionPhoto() {	
    yield takeEvery('GET__SUGGESTED_PHOTO_COLLECTION',GetDataAsync);
  }
 