import Axios from "axios";

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

const movieServices = () => {
    return {
        getToken: () => Axios.post('http://api.kvikmyndir.is/authenticate', {
            username: userName,
            password: password
        }).then(data => {
            return data.data.token;
        }),

        getMovies: (token) => {
            return Axios.get(`http://api.kvikmyndir.is/movies?token=${token}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                return data
            })
        },

        getUpcomming: (token) => {
            return Axios.get(`http://api.kvikmyndir.is/upcoming?token=${token}`, {
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