import './App.css';
import React from 'react';
//import LogInForm from './components/login';
//import { LogInContext } from './context/LogInContext';
import Login from "./pages/Login.jsx"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import Root from './pages/Root';
import Create from './pages/Create';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Listing from './pages/Listing';
import './style.scss'
import Register from './pages/Register';
import FileContent from './pages/FileContent';

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children:[
      { 
        path:"/root",
        element: <Root/>
      },
      {
        path:"/create",
        element: <Create/>
      },
      {
        path:"/root/:id",
        element: <Listing/>
      },
      {
        path:"/root/file/:id",
        element: <FileContent/>
      }
    ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/register",
    element: <Register/>
  }
]);



function App() {

  return (
    <div className="app">
       <div className="container">
         <RouterProvider router={router}/>
       </div>
    </div>
  );
}



export default App;
