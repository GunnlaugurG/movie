import Axios from "axios";

const movieServices = (props) => {
    return {
        getToken: (props) => Axios.post('http://api.kvikmyndir.is/authenticate', {
            username: "gunnlaugur",
            password: "1.Numberone"
        }).then(data => {
            return data.data.token;
        }),

        getMovies: (props) => 
            Axios.get(`http://api.kvikmyndir.is/movies?token=${props}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                return data
        })
    }
}

export default movieServices();