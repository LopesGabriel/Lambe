import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

const initialState = {
    posts: [{
        id: Math.random(),
        nickname: 'Matheus de Oliveira Lopes',
        email: 'matlopes1999@gmail.com',
        image: require('../../../assets/imgs/fence.jpg'),
        comments: [{
            nickname: 'Ivaneide Lopes',
            comment: 'Lindo meu filho!!'
        }, {
            nickname: 'Suzana',
            comment: 'Top de mais meu gato!'
        }]
    }, {
        id: Math.random(),
        nickname: 'Ivaneide Lopes',
        email: 'nutneide@bol.com.br',
        image: require('../../../assets/imgs/bw.jpg'),
        comments: [{
            nickname: 'Gabriel Lopes',
            comment: 'Lindo mãe <3'
        }]
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({
                    ...action.payload
                })
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(action.payload.comment)
                        } else {
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post
                })
            }
        default:
            return state
    }
}

export default reducer