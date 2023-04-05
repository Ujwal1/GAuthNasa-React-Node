
import React, { useState } from 'react';
import Homepage from './components/Homepage/homepage';
import Login from './components/Login/login';
import Register from './components/Register/register';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import "./App.css"
const routes = [
  {
    path: '/',
    element:<Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/homepage',
    element: <Homepage />,
  }
];

const routeConfig = createBrowserRouter(routes);

function App() {
  return (<div className='App'>
  <RouterProvider router={routeConfig}/>
  </div>
  )
}

export default App;