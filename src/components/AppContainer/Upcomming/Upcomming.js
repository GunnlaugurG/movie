import React from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import movieService from '../services/movieServices';
import UpcommingList from './UpcommingList/UpcommingList';
import SkeletonCard from '../../common/Skeleton'
import { Grid } from '@material-ui/core';
import { setUpcomming } from '../../../actions/generalActions'

class Upcomming extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: null,
            loading: true,
        }
    }

    componentDidMount() {
        const { upcomming } = this.props;
        // if are not in redux then we need fetch the movies
        if (upcomming) {
            this.setState({movies: upcomming, loading: false});
        } else {
            this.getUpcommingMovies();
        }
    }

    getUpcommingMovies() {
        const { setUpcomming } = this.props;
        movieService.getUpcomming().then(response => {
            if ( !response.data.error ) {
                const sortedMovies = response.data.sort((a,b) => new Date(a['release-dateIS']) - new Date(b['release-dateIS']));
                this.setState({movies: sortedMovies, loading: false});
                setUpcomming(response.data)
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
                        <Grid container spacing={3}>
                            {movies ? movies.map(movie =>  
                                <Grid  key={movie.id} item lg={2} md={3} sm={4} xs={6}>
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
      upcomming: general.upcomming
    }
}

export default connect(mapStateToProps, { setUpcomming })(withNamespaces()(Upcomming));