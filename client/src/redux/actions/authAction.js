import axios from 'axios';
import {AUTH_USER} from './types';

export const authAndSetUser = () => dispatch => {
    axios
        .get('/api/current_user')
        .then(res => {
            console.log(res);
            dispatch({
                type: AUTH_USER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

