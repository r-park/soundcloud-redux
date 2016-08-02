import App from './app';
import HomePage from './pages/home';


export const routes = {
  path: '/',
  component: App,
  childRoutes: [
    {
      indexRoute: {
        component: HomePage
      }
    }
  ]
};
