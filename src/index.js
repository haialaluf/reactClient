import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppStore from './serverConnection/AppStore';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Provider store={ AppStore }><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
