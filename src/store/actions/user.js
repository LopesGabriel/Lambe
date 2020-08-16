import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from './actionTypes'
import axios from 'axios'

const authBaseURL = 'https:///www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyBTbQwgp0byMOhmOw1Z5mEMxaRKiVQIgwU'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload:  user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = user => {
    return dispatch => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => console.error(err))
            .then(res => {
                if(res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => console.error(err))
                        .then(res => {
                            console.log(res.data)
                            console.log('Usuário criado com sucesso!')
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => console.error(err))
            .then(res => {
                if(res.data.localId) {
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => console.error(err))
                        .then(res => {
                            user.password = null
                            user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}