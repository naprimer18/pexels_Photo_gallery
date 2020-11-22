import { combineReducers } from 'redux'
import OriginPhoto from './getOriginPhoto'
import RandomPhoto from './getRandomPhoto'

export default combineReducers({
    OriginPhoto,
    RandomPhoto
})
