import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/Home.tsx';
// import ProtectedRoute from '../components/utils/ProtectedRoute';
// import NotFound from '../pages/NotFound';
// import UsersList from '../pages/users/UsersList';
// import AddUser from '../pages/users/AddUser';
// import EditUser from '../pages/users/EditUser';
// import ViewUser from '../pages/users/ViewUser';
// import GroupsList from '../pages/groups/GroupsList';
// import ViewGroup from '../pages/groups/ViewGroup';
// import AddGroup from '../pages/groups/AddGroup';
// import EditGroup from '../pages/groups/EditGroup';
// import WishesList from '../pages/wishes/WishesList';
// import ScheduleList from '../pages/schedules/SchedulesList';

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
  // Future routes
  // {
  //   path: '/peoples',
  //   element: <UsersList />,
  // },
  // {
  //   path: '/addUser',
  //   element: <AddUser />,
  // },
  // {
  //   path: '/editUsers/:id',
  //   element: <EditUser />,
  // },
  // {
  //   path: '/peoples/:id',
  //   element: <ViewUser />,
  // },
  // {
  //   path: '/groups',
  //   element: <GroupsList />,
  // },
  // {
  //   path: '/groups/:id',
  //   element: <ViewGroup />,
  // },
  // {
  //   path: '/addGroup',
  //   element: <AddGroup />,
  // },
  // {
  //   path: '/editGroup/:id',
  //   element: <EditGroup />,
  // },
  // {
  //   path: '/wishesList',
  //   element: <WishesList />,
  // },
  // {
  //   path: '/schedules',
  //   element: <ScheduleList />,
  // },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export default router;
