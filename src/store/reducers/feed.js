import { FEED_LOADING, FEED_LOADED } from '../actions/actionTypes'

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FEED_LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer