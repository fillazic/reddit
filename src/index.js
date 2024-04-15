
import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import store from './App/store.js';
import App from './App/App.js';


const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
