import { SET_MOVIES, SET_UPCOMMING } from '../constants';

let initialState = {
    movies: null,
    upcomming: null
}

export default function(state = initialState, action) {
    switch (action.type) {
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