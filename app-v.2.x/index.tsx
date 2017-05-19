import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.dev';
import CreateReduxDevTools from './components/redux-dev-tools/redux-dev-tools';

const store = configureStore();

const RootElement = document.createElement('div');
RootElement.setAttribute('id', 'root');
document.body.appendChild(RootElement);

ReactDOM.render(
  <Provider store={ store }>
    <CreateReduxDevTools />
  </Provider>,
  document.getElementById('root')
);
