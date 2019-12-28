import Axios from "axios";

const movieServices = () => {
    return {
        getMovies: () => {
            return Axios.get(`https://icemovieserver.herokuapp.com/api/movies/movies`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                return data
            })
        },

        getUpcomming: () => {
            return Axios.get(`https://icemovieserver.herokuapp.com/api/movies/upcoming`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                return data
            })
        },
    }
}

export default movieServices();