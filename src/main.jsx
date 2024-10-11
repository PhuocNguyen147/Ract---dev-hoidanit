// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx';
import TodoApp from './component/todo/TodoApp.jsx';
import ErrorPage from './component/layout/error.jsx';
import { AuthWrapper } from './component/context/auth.context.jsx';
import PrivateRouter from './pages/private.route.jsx';
const router = createBrowserRouter([  //chia trang tren thanh tim kiem
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    //nested router cha-con
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/users",
        element: <UserPage />
      }
      ,
      {
        path: "/books",
        element: (
          <PrivateRouter>
            <BookPage />
          </PrivateRouter>
        )

      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
  ,
  {
    path: "/register",
    element: <RegisterPage />
  }


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

  // </React.StrictMode>,
)
