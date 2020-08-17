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
import messageReducer from './reducers/message'

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    feed: feedReduder,
    message: messageReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig