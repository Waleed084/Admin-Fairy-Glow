import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Home from './Home';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Home /> // Use the Home component as the default route
    },
    MainRoutes, // Keep your MainRoutes and other routes here
    AuthenticationRoutes
  ]);
}
