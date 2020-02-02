import {GET_SCHEDULES, ADD_SCHEDULE} from '../actions/types';

const initialState = {
    schedules: [],
    didPostSuccessfully: false
}

export default (state = Object.assign({}, initialState), action) => {
    switch(action.type) {
        case GET_SCHEDULES:
            return {
                ...state,
                schedules: action.payload
            }
        case ADD_SCHEDULE:
            return {
                ...state,
                didPostSuccessfully: true
            }
        default:
            return state;
    }
}