import { SET_TOKEN } from '../constants';

let initialState = {
    token: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN: 
            return action.payload;
        default: return state;
    }
}