import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import {watchGetOriginPhoto} from './sagas/getOriginPhotoSaga'
import {watchGetRandomPhoto} from './sagas/getRandomPhotoSaga'
import {watchGetSuggestedCollectionPhoto} from './sagas/getSuggestedCollectionPhoto'

const sagaMiddleware = createSagaMiddleware()
const initialState = {}
const enhancers = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  ...enhancers
)

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
)
		
sagaMiddleware.run(watchGetOriginPhoto);
sagaMiddleware.run(watchGetRandomPhoto);
sagaMiddleware.run(watchGetSuggestedCollectionPhoto);
