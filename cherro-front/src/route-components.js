import { routeNaming } from './routes/routes';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Login } from './pages/login';
import { Register } from './pages/register';

const routeConfig = [
  {
    name: routeNaming.HOME,
    component: Home,
  },
  {
    name: routeNaming.LOGIN,
    component: Login,
  },
  {
    name: routeNaming.REGISTER,
    component: Register,
  },
  {
    name: routeNaming.NOT_FOUND,
    component: NotFound,
  },
];

export { routeConfig };
