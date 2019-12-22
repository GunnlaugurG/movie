import React from 'react';
import movieService from '../services/movieServices';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import MoviesList from './MoviesList/MoviesList';
import CircularIndeterminate from '../../common/Loading';
import { Grid } from '@material-ui/core';
import { setMovies } from '../../../actions/generalActions'


class MoviesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            movies: null,
            loading: true,
            fetched: false
        }
    }

    componentDidMount() {
        const { token, movies } = this.props;
        // if token is set, then we can fetch the movies
        if (movies) {
            this.setState({movies: movies, loading: false});
        }
        if ( token && !movies ) {
            this.getAllMovies(token)
        }
    }

    componentDidUpdate(props) {
        // if the token was not set when component mounted, we wait for the token and the fetch movies.
        const { token, movies } = this.props;
        const { fetched } = this.state;
        if ( !movies && token && !fetched) {
            this.getAllMovies(token)
        }
    }

    getAllMovies(token) {
        const { setMovies } = this.props;
        this.setState({fetched: true})
        movieService.getMovies(token).then(response => {
            if ( !response.data.error ) {
                this.setState({movies: response.data, loading: false});
                setMovies(response.data)
            }
        }, err => {
            console.log('error occured dude', err);
        })
    }

    render() {
        const { t } = this.props;
        const { movies, loading } = this.state;
        return (
            <>
                <div className="movie-container">
                {
                    loading 
                    ? 
                    <CircularIndeterminate></CircularIndeterminate>
                    :
                    <Grid container spacing={3}>
                        {movies ? movies.map(movie =>  
                            <Grid  key={movie.id} item md={3} sm={6} xs={12}>
                                <MoviesList movie={movie}></MoviesList>
                            </Grid>
                         ) : <p>No content</p> } 
                    </Grid>
                }
                </div>
            </>
        )
    }
}

const mapStateToProps = reduxStoreState => {
    const { general } = reduxStoreState;
    return {
      token: general.token,
      movies: general.movies
    }
}

export default connect(mapStateToProps, { setMovies })(withNamespaces()(MoviesComponent));