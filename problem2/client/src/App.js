import {createBrowserRouter,RouterProvider} from 'react-router-dom'
/* importing all components */
import Username from './components/Username'
import Password from './components/Password'
import Profile from './components/Profile'
import Register from './components/Register'
import Recovery from './components/Recovery'
import Reset from './components/Reset'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Username/>
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/password',
    element: <Password />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/recovery',
    element: <Recovery />
  },
  {
    path: '/reset',
    element: <Reset />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
])

function App() {
  return (
    <main className="App">
      <RouterProvider router={router}></RouterProvider>
    
    </main>
  );
}

export default App;
