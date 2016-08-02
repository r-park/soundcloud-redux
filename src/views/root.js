import React from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import useScroll from 'react-router-scroll';
import { routes } from './routes';


function Root({history, store}) {
  return (
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>
  );
}

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default Root;
