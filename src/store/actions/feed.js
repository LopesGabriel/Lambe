import { FEED_LOADED, FEED_LOADING } from './actionTypes'

export const loadingFeed = () => {
    return {
        type: FEED_LOADING
    }
}

export const feedLoaded = () => {
    return {
        type: FEED_LOADED
    }
}