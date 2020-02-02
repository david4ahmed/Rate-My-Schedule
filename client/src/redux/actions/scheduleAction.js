import axios from 'axios';
import {ADD_SCEDULE, GET_SCHEDULES} from './types';

export const addSchedule = dataToPost => dispatch => {
    axios
        .post('/schedules/create', dataToPost)
        .then(res => {
            console.log(res.data);
            dispatch({type: ADD_SCEDULE, payload: res.data})
        })
        .catch(err => console.log(err))
}

export const getSchedules = () => dispatch => {
    axios
        .get('/schedules')
        .then(res => {
            dispatch({type: GET_SCHEDULES, payload: res.data});
        })
        .catch(err => dispatch({type: GET_SCHEDULES, payload:null}))
}
