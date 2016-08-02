import App from './app';
import HomePage from './pages/home';
import SearchPage from './pages/search';


export const routes = {
  path: '/',
  component: App,
  childRoutes: [
    {
      indexRoute: {
        component: HomePage
      }
    },
    {
      path: '/search',
      component: SearchPage
    }
  ]
};
