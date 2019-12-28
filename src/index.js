import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers'
import { applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import App from './components/App';
import '../styles/site.css';
import '../styles/site.less';
import './i18n';
import { CookiesProvider } from 'react-cookie';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <CookiesProvider>
        <Provider store={ store }>
            <Router>
                <App />
            </Router>
        </Provider>
    </CookiesProvider>
    
    
    , document.getElementById('app'));
