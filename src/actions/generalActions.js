import { SET_MOVIES, SET_UPCOMMING } from '../constants'

export const setMovies = movies => {
    return {
        type: SET_MOVIES,
        payload: movies
    }
}

export const setUpcomming = movies => {
    return {
        type: SET_UPCOMMING,
        payload: movies
    }
}