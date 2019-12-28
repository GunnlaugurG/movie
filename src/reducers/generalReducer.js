import { SET_TOKEN, SET_MOVIES, SET_UPCOMMING } from '../constants';

let initialState = {
    token: '',
    movies: null,
    upcomming: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return ({
                ...state,
                token: action.payload
            });
            break;
        case SET_MOVIES:
            return ({
                ...state,
                movies: action.payload
            });
            break;
        case SET_UPCOMMING:
            return ({
                ...state,
                upcomming: action.payload
            });
            
        default: return state;
    }
}