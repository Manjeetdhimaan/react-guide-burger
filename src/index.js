import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/reducer';

// const store = createStore(reducer);
const store = configureStore({
    reducer: {
        rootReducer: rootReducer
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
  );
  
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
