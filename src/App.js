
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase/firebase.init';
import ReactBootstrap from './components/ReactBootstrap/ReactBootstrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layouts/Main';
import Login from './components/Login/Login';





function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element : <Main></Main>,
      children : [
        {
          path: '/',
          element : <ReactBootstrap></ReactBootstrap>,
        },
        {
          path: '/register',
          element : <ReactBootstrap></ReactBootstrap>,
        },
        {
          path: '/login',
          element : <Login></Login>,
        }
      ]
    }
  ])
  return (
    <div >
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
