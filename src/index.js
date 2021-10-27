import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {AuthState} from './context/auth/AuthState'

const app = (
  <AuthState>
    <App/>
  </AuthState>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
