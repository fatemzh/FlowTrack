import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/Home.tsx';
import ProfilePage from '../pages/Profile.tsx';
import AboutPage from '../pages/About.tsx';
import ProtectedRoute from '../components/utils/ProtectedRoute';
import NotFound from '../pages/NotFound';
import UsersList from '../pages/users/UsersList';
import AddUser from '../pages/users/AddUser';
import EditUser from '../pages/users/EditUser';
import ViewUser from '../pages/users/ViewUser';
import GroupsList from '../pages/groups/GroupsList';
import ViewGroup from '../pages/groups/ViewGroup';
import AddGroup from '../pages/groups/AddGroup';
import EditGroup from '../pages/groups/EditGroup';
import ScheduleList from '../pages/schedules/SchedulesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />, // Redirect root to home
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/users',
    element: <UsersList />,
  },
  {
    path: '/teams',
    element: <GroupsList />,
  },
  {
    path: '/addUser',
    element: <AddUser />,
  },
  {
    path: '/editUsers/:id',
    element: <EditUser />,
  },
  {
    path: '/peoples/:id',
    element: <ViewUser />,
  },
  
  {
    path: '/groups/:id',
    element: <ViewGroup />,
  },
  {
    path: '/addGroup',
    element: <AddGroup />,
  },
  {
    path: '/editGroup/:id',
    element: <EditGroup />,
  },
  {
    path: '/schedules',
    element: <ScheduleList />,
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export default router;
