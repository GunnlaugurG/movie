import React from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import movieService from '../services/movieServices';
import UpcommingList from './UpcommingList/UpcommingList';
import CircularIndeterminate from '../../common/Loading';
import SkeletonCard from '../../common/Skeleton'
import { Grid } from '@material-ui/core';
import { setUpcomming } from '../../../actions/generalActions'

class Upcomming extends React.Component {
    constructor() {
        super();
        this.state = {
            token: '',
            movies: null,
            loading: true,
            fetched: false,
        }
    }

    componentDidMount() {
        const { token, upcomming } = this.props;
        // if token is set, then we can fetch upcomming movies
        if (upcomming) {
            this.setState({movies: upcomming, loading: false});
        }
        if ( token && ! upcomming) {
            this.getUpcommingMovies(token);
        }
    }

    componentDidUpdate(props) {
        // if the token was not set when component mounted, we wait for the token and the fetch movies.
        const { token, upcomming } = this.props;
        const { fetched } = this.state;
        if ( !upcomming && token && !fetched ) {
            this.getUpcommingMovies(token)
        }
    }
    getUpcommingMovies(token) {
        const { setUpcomming } = this.props;
        this.setState({fetched: true});
        movieService.getUpcomming(token).then(response => {
            if ( !response.data.error ) {
                this.setState({movies: response.data, loading: false});
                setUpcomming(response.data)
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
                    <Grid container spacing={3}>
                        {[1,2,3,4,5,6].map(key =>  
                            <Grid  key={key} item md={3} sm={6} xs={12}>
                                <SkeletonCard/>
                            </Grid>
                        )} 
                    </Grid>
                    :

                    <Grid container spacing={3}>
                        {movies ? movies.map(movie =>  
                            <Grid  key={movie.id} item md={3} sm={6} xs={12}>
                                <UpcommingList movie={movie}></UpcommingList>
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
      upcomming: general.upcomming
    }
}

export default connect(mapStateToProps, { setUpcomming })(withNamespaces()(Upcomming));