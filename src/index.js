import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById("root"));
// https://react-my-builder-70-default-rtdb.firebaseio.com/
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
