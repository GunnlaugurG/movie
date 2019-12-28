import React from 'react';
import movieService from '../services/movieServices';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import MoviesList from './MoviesList/MoviesList';
import SkeletonCard from '../../common/Skeleton'
import { Grid } from '@material-ui/core';
import { setMovies } from '../../../actions/generalActions'


class MoviesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            loading: true,
        }
    }

    componentDidMount() {
        const { movies } = this.props;
        // if are not in redux then we need fetch the movies
        if (movies) {
            this.setState({movies: movies, loading: false});
        } else { 
            this.getAllMovies()
        }
    }

    getAllMovies() {
        const { setMovies } = this.props;
        movieService.getMovies().then(response => {
            if ( !response.data.error ) {
                this.setState({movies: response.data, loading: false});
                setMovies(response.data)
            }
        }, err => {
            console.error('error occured dude', err);
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
                    <Grid container spacing={1}>
                        {[1,2,3,4,5,6].map(key =>  
                            <Grid  key={key} item lg={2} md={3} sm={4} xs={6}>
                                <SkeletonCard/>
                            </Grid>
                        )} 
                    </Grid>
                    :
                    <Grid container spacing={1}>
                        {movies.length > 0 ? movies.map(movie =>  
                            <Grid  key={movie.id} item lg={2} md={3} sm={4} xs={6}>
                                <MoviesList movie={movie}></MoviesList>
                            </Grid>
                         ) : <h3>{ t('movies.no-movies-today') }</h3> } 
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
      movies: general.movies
    }
}

export default connect(mapStateToProps, { setMovies })(withNamespaces()(MoviesComponent));