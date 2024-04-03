import React from 'react';
import ReactDOM from 'react-dom';

// here in index.js we will also be initialising our redux
import { Provider } from 'react-redux';
// Provider keeps track of the store and gives us access from anywhere inside App
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'
import './index.css'
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);