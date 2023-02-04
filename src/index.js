import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { compose } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

// const store = createStore(reducer);
const rootReducer = {
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
    reducer: rootReducer,
    composeEnhancers
    // enhancers: composeEnhancers
    // middleware: (getDefaultMiddleware) =>
    //     [
    //         ...getDefaultMiddleware(),
    //         thunk,
    //     ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
