import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers'
import App from './components/App';
import '../styles/site.css';
import '../styles/site.less';
import './i18n';

ReactDOM.render(<Provider store={ createStore(reducers)}><Router><App /></Router></Provider>, document.getElementById('app'));
