import { SET_POSTS, CREATING_POST, POST_CREATED } from './actionTypes'
import { loadingFeed, feedLoaded } from './feed'
import { setMessage } from './message'
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
            .catch(err => {
                dispatch(setMessage({
                    title: 'Falha ao subir imagem!',
                    text: err.message
                }))
            })
            .then(res => {
                post.image = res.data.imageUrl;
                axios.post('/posts.json', { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Falha ao criar o post!',
                            text: err.message
                        }))
                    })
                    .then(res => console.log(res.data))
            })
            .finally(() => {
                dispatch(fetchPosts())
                dispatch(postCreated())
            })
    }
}

export const addComment = payload => {
    return dispatch => {
        axios.get(`/posts/${payload.id}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err.message
                }))
            })
            .then(res => {
                const comments = res.data.comments ||  []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.id}.json`, { comments })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Falha ao incluir comentário!',
                            text: err.message
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
    // return {
    //     type: ADD_COMMENT,
    //     payload
    // }
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
            .catch(err => {
                dispatch(setMessage({
                    title: 'Falha ao buscar posts!',
                    text: err.message
                }))
            })
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