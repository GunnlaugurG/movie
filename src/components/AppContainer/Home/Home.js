import React from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import movieService from '../services/movieServices';
import UpcommingList from './UpcommingList/UpcommingList';
import CircularIndeterminate from '../../common/Loading';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            token: '',
            movies: null,
            loading: true
        }
    }

    componentDidMount() {
        const { token } = this.props;
        // if token is set, then we can fetch upcomming movies
        if ( token ) {
            this.getUpcommingMovies(token)
        }
    }

    componentDidUpdate(props) {
        // if the token was not set when component mounted, we wait for the token and the fetch movies.
        const { token } = this.props;
        const { movies } = this.state;
        if ( !movies ) {
            this.getUpcommingMovies(token)
        }
    }

    getUpcommingMovies(token) {
        movieService.getUpcomming(token).then(response => {
            console.log(response);
            if ( !response.data.error ) {
                this.setState({movies: response.data, loading: false});
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
                <h1>{ t('movies.title') }</h1>
                <div className="movie-container">
                {
                    loading 
                    ? 
                    <CircularIndeterminate></CircularIndeterminate>
                    :

                    movies ? movies.map(movie => <UpcommingList key={movie.id} movie={movie}></UpcommingList>) : <p>No content</p>  
                }
                </div>
            </>
        )
    }
}

const mapStateToProps = reduxStoreState => {
    return {
      token: reduxStoreState.general
    }
}

export default connect(mapStateToProps, null)(withNamespaces()(Home));