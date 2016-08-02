import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import './views/styles/styles.scss';
import configureStore from './core/store';
import Root from './views/root';


const rootElement = document.getElementById('root');
const store = configureStore();


function render(Root) {
  ReactDOM.render(
    <AppContainer>
      <Root
        history={browserHistory}
        store={store}
      />
    </AppContainer>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./views/root', () => {
    render(require('./views/root').default);
  });
}


render(Root);
