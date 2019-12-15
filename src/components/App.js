import React from 'react';
import movieServices from './AppContainer/services/movieServices'
import AppContainer from './AppContainer/AppContainer'
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { setToken } from '../actions/generalActions';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }

    componentDidMount() {
        const { cookies, setToken } = this.props;

        // if we cannot find the cookie 'token' we need to fetch new token and set it in cookie and in redux for easy access
        if ( !cookies.get('token') ) {
            movieServices.getToken().then(token => {
                cookies.set('token', token, {
                    maxAge: 3600
                });
                setToken(token);
            })
        } else {
            // if the cookie exists then we can simply set it in the redux store.
            setToken(cookies.get('token'))
        }
    }
    render() {
        return (<AppContainer></AppContainer>)
    }
};

const mapStateToProps = reduxStoreState => {
    return {
      token: reduxStoreState.general
    }
}

export default withCookies(connect(mapStateToProps, { setToken })(App));

