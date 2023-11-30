import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrapping it with a Provider so that store is passed all over the app */}
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);



