import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import chatApp from './reducers';
import Root from './containers/Root.react';

import api from './utils/ChatAPI';

const loggerMiddleware = createLogger();

const store = createStore(
  chatApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

if (typeof document !== 'undefined') {
  api.listen(store.dispatch);

  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  );
}
