import {AUTH_USER} from '../actions/types'

const initialState = {
    authenticated: false,
    user: {}
}

const authReducer = (state = Object.assign({}, initialState), action) => {
    switch(action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: !!action.payload,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer