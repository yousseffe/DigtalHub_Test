import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import { Home } from './Pages/Home';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  const routes = createHashRouter([
    {path: '/' , element: <ProtectedRoutes ><Home/></ProtectedRoutes>},
    {path: '/signup', element: <SignUp/>},
    {path: '/login',element:<LogIn/>},
    {path: '*', element: <h1>Not Found</h1>}
  ])
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
