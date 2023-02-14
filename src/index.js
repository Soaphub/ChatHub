import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <StrictMode> 
        <Provider store={store}>
            <App/> 
        </Provider>
    </StrictMode>);
