import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Resource from '@guestyci/agni';
import createHistory from '@guestyci/history/createHistory';
import LocalizationProvider from '@guestyci/localize/LocalizationProvider';
import { Router } from 'react-router-dom';
import '@guestyci/foundation/style/styles.css';
import ToastProvider from '@guestyci/foundation/Toast';
import App from './app/App';
import configureStore from './store';
import bootstrap from './bootstrap';

// This is your main project entry
// Add the global css and the required initializations here

// Create a global api to be injected into thunk middleware
// for further customization check https://github.com/guestyorg/agni
const { api } = Resource.create();
// Configure your redux store with your initial stare and global api
// Store is configured with thunk as its default middleware
const history = createHistory({ baseUrl: '/' });
const store = configureStore({}, api);

// Required by Guesty's infrastructure
// DO NOT REMOVE!!!
bootstrap();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <LocalizationProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </LocalizationProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
