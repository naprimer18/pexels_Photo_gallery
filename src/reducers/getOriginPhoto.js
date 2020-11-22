
const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PUT_PHOTO_COLLECTION':
          return {
            ...state,...action.payload
          }  
       default:
         return state
     }
}  