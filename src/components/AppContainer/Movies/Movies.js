import React from 'react';
import movieService from '../services/movieServices';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import MoviesList from './MoviesList/MoviesList';


class MoviesComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            token: '',
            movies: null
        }
    }

    componentDidMount() {
        const { token } = this.props;
        // if token is set, then we can fetch the movies
        if ( token ) {
            this.getAllMovies(token)
        }
    }

    componentDidUpdate(props) {
        // if the token was not set when component mounted, we wait for the token and the fetch movies.
        const { token } = this.props;
        const { movies } = this.state;
        if ( !movies ) {
            this.getAllMovies(token)
        }
    }

    getAllMovies(token) {
        movieService.getMovies(token).then(response => {
            if ( !response.data.error ) {
                this.setState({movies: response.data});
            }
        }, err => {
            console.log('error occured dude', err);
        })
    }

    render() {
        const { t } = this.props;
        const { movies } = this.state;
        return (
            <div>
                <h1>{ t('movies.title') }</h1>
                {
                  !movies 
                    ? 
                    <p>No movies found</p> 
                    :
                    movies.map(movie => <MoviesList key={movie.id} movie={movie}></MoviesList>)  
                }
            </div>
        )
    }
}

const mapStateToProps = reduxStoreState => {
    const { token } = reduxStoreState;
    return {
      token: reduxStoreState.general
    }
}

export default connect(mapStateToProps, null)(withNamespaces()(MoviesComponent));