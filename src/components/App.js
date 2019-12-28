import React from 'react';
import AppContainer from './AppContainer/AppContainer'
import { withCookies } from 'react-cookie';
import i18n from '../i18n';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const { cookies } = this.props;
        // set language to cookie, if it exists.
        if ( cookies.get('lang') ) {
            i18n.changeLanguage(cookies.get('lang'))
        }
    }

    render() {
        return (<AppContainer />)
    }
};



export default withCookies(App);

