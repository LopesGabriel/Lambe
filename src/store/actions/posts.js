import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED } from './actionTypes'
import { loadingFeed, feedLoaded } from './feed'
import axios from 'axios'

export const addPost = post => {
    return dispatch => {
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-gabriel-homolog.cloudfunctions.net/',
            method: 'POST',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.error(err))
            .then(res => {
                post.image = res.data.imageUrl;
                axios.post('/posts.json', { ...post })
                    .catch(err => console.error(err))
                    .then(res => console.log(res.data))
            })
            .finally(() => {
                dispatch(fetchPosts())
                dispatch(postCreated())
            })
    }
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        dispatch(loadingFeed())
        axios.get('/posts.json')
            .catch(err => console.error(err))
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for(let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                dispatch(setPosts(posts.reverse()))
            })
            .finally(() => {
                dispatch(feedLoaded())
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}