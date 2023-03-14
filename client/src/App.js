import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import TopBar from './components/Topbar/TopBar'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { AuthContext } from './context/authContext'
import {useContext} from 'react'

function App() {
  window.scrollBy(0 , 10)

  const {currentUser} = useContext(AuthContext);

  const Layout = () => {
    return(
      <div>
        <TopBar/>
        <Outlet/>
      </div>
    )
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='/login'/>
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
