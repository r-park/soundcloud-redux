import App from './app';
import HomePage from './pages/home';
import SearchPage from './pages/search';
import UserPage from './pages/user';


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
    },
    {
      path: '/users/:id/:resource',
      component: UserPage
    }
  ]
};
