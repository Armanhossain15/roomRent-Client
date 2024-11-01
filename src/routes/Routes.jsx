import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import Statistic from '../pages/DashboardPage/Common/Statistic/Statistic'
import AddRoom from '../pages/DashboardPage/Host/AddRoom/AddRoom'
import MyListing from '../pages/DashboardPage/Host/MyListing/MyListing'
import Profile from '../pages/DashboardPage/Common/Profile/Profile'
import ManageUser from '../pages/DashboardPage/Admin/ManageUser/ManageUser'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails/></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        index: true,
        element: <Statistic/>
      },
      {
        path: 'add-room',
        element: <AddRoom/>
      },
      {
        path: 'my-listings',
        element: <MyListing />
      },
      {
        path: 'manage-users',
        element: <ManageUser />
      },
      {
        path: 'profile',
        element: <Profile />
      },
    ]
  }
])
