import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/user'
import postsReducer from './reducers/posts'
import feedReduder from './reducers/feed'

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    feed: feedReduder
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig