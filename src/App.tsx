import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Error from './pages/Error';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/pages/Profile';
import Contact from './pages/Contact';
import Members from './pages/dashboard/pages/Members';
import Blogs from './pages/dashboard/pages/blog/Blogs';
import Community from './pages/dashboard/pages/Community';
import Homepage from './pages/Homepage';
import ManageBlogs from './pages/dashboard/pages/blog/ManageBlogs';
import CreateBlogModal from './pages/dashboard/pages/blog/CreateBlog';
import Analytics from './pages/dashboard/pages/Analytics';
import Settings from './pages/dashboard/pages/Settings';
import DashboardPage from './pages/DashboardPage';
import Services from './components/Services';
import EmailSender from './pages/dashboard/pages/EmailSender';

function App() {
  const router = createBrowserRouter([
    {
      path: '/dashboard_page',
      element: <DashboardPage />,
      errorElement: <Error />
    },
    {
      path: '/',
      element: <Homepage />,
      errorElement: <Error />
    },
    {
      path: 'about-us',
      element: <About />,
      errorElement: <Error />
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />
    },
    {
      path: 'contact-us',
      element: <Contact />,
      errorElement: <Error />
    },
    {
      path: '/dashboard_page',
      element: <Dashboard />,
      errorElement: <Error />,
      children: [
        {
          path: 'user_profile',
          element: <Profile />
        },
        {
          path: 'members',
          element: <Members />
        },
        {
          path: 'analytics',
          element: <Analytics />
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'blogs',
          element: <Blogs />
        },
        {
          path: 'create-blog',
          element: <CreateBlogModal />
        },
        {
          path: 'manage-blogs',
          element: <ManageBlogs />
        },
        {
          path: 'community',
          element: <Community />
        },
        {
          path: 'services',
          element: <Services />
        },
        {
          path: 'mail',
          element: <EmailSender />
        }
      ]
      }
  ])

  return <RouterProvider router={router} />
}

export default App
