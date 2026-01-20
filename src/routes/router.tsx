import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/auth/SignUp";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import GuestLayout from "../components/Layouts/GuestLayout";
import Users from "../pages/Users";
import SignIn from "../pages/auth/SignIn";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Home />
      },
      {
        path: '/users',
        element: <Users />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />, 
    children: [
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router