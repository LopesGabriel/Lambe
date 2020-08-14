import { ADD_POST } from '../actions/actionTypes'

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
        default:
            return state
    }
}

export default reducer