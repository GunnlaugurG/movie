import React from 'react';
import movieService from '../services/movieServices';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import MoviesList from './MoviesList/MoviesList';
import SkeletonCard from '../../common/Skeleton'
import { Grid } from '@material-ui/core';
import { setMovies } from '../../../actions/generalActions';
import Filters from './Filters';

class MoviesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            loading: true,
            filteredMovies: [],
            activeFiltersArray: []
        }
        this.handleCinemaChange = this.handleCinemaChange.bind(this);
    }

    componentDidMount() {
        console.log(date.toLocaleString('de-DE', {hour: '2-digit',   hour12: false, timeZone: 'Asia/Shanghai' }));
        const { movies } = this.props;
        // if are not in redux then we need fetch the movies
        if (movies) {
            this.setState({movies: movies, loading: false, filteredMovies: movies});
        } else { 
            this.getAllMovies()
        }
    }

    // shouldComponentUpdate(nextProp, nextState) {
    //     if (nextState.movies !== this.state.movies || nextState.loading !== this.state.loading) {
    //         return true;
    //     }
    //     return false;
    // }

    getAllMovies() {
        const { setMovies } = this.props;
        movieService.getMovies().then(response => {
            if ( !response.data.error ) {
                this.setState({movies: response.data, loading: false, filteredMovies: response.data});
                setMovies(response.data)
            }
        }, err => {
            console.error('error occured dude', err);
        })
    }

    handleCinemaChange(event, cinemasDict) {
        const { movies } = this.state; 
        if ( event.length === 0) {
            this.setState({filteredMovies: movies});
            return;
        } else {
            let foundMovies = [];
            for (let mov in cinemasDict) {
                if ( event.some(r => cinemasDict[mov].includes(r)) ) {
                    foundMovies.push(mov)
                }
            }
            let tempMovies = [];
            for (let movie of movies) {
                if (foundMovies.includes(movie.title)) {
                    tempMovies.push(movie)
                }
            }
            this.setState({filteredMovies: tempMovies, activeFiltersArray: event})
        }
    }


    render() {
        const { t } = this.props;
        const openFilters = openFilters;
        const { filteredMovies, loading, movies, activeFiltersArray } = this.state;
        let moviesInCinemas = [];
        let allCinemas = [];
        // If movies have been recieved, go through all movies and add them to a array for each cinema they are shown in.
        movies ? movies.map(movie => {
            movie.showtimes.map(showT => {
                if (!allCinemas.hasOwnProperty(showT.cinema.name)) {
                    allCinemas[showT.cinema.name] = 0;
                }
                if (!moviesInCinemas.hasOwnProperty(movie.title)) {
                    moviesInCinemas[movie.title] = [];
                }
                moviesInCinemas[movie.title] = [...moviesInCinemas[movie.title], showT.cinema.name ? showT.cinema.name : 'undefined' ];
                allCinemas[showT.cinema.name]++;
            })
        }) : null;
        this.moviesInCinemas = moviesInCinemas;

        return (
            <>
                <Grid container justify="space-between">
                    <Grid item xs={6}>
                        <h1>{ t('movies.title') }</h1>
                    </Grid>
                    <Grid item container xs={6} justify="flex-end">
                        <Filters moviesInCinemas={moviesInCinemas} cinemas={allCinemas} activeFiltersArray={activeFiltersArray} changeHandler={(event, cinemasDict) => this.handleCinemaChange(event, cinemasDict)} />
                    </Grid>    
                </Grid>
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
                        {filteredMovies.length > 0 ? filteredMovies.map(movie =>  
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