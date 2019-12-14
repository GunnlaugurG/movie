import React from 'react';
import movieService from '../services/movieServices';

export default class MoviesComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: null
        }
    }

    componentDidMount() {
        // movieService.getToken().then(token => {
        //     console.log(token);
        //     movieService.getMovies(token).then(data => {
        //         console.log(data);
        //     })
        // });
    }

    render() {
        return (
            <div>
                <h1>WORKS FROM MOVIES</h1>
            </div>
        )
    }
}