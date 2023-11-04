import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider, useSelector } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loginpage from './pages/Login'
import Singuppg from './pages/Singup'
import Allpost from './pages/AllPost'
import Home from './pages/Home'
import Authlayout from './components/Authlayout'
import AddPost from './pages/Postform'
import Editpost from './pages/Editpost'
import Post from './pages/Post'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          <Authlayout authentication={false}>
            <Loginpage />
          </Authlayout>
        )
      }, {
        path: '/singup',
        element: (
          <Authlayout authentication={false}>
            <Singuppg />
          </Authlayout>
        ),
      }, {
        path: '/allpost',
        element: (
          <Authlayout authentication={true}>
            {' '}
            <Allpost />
          </Authlayout>
        )
      }, {
        path: '/add-post',
        element: (
          <Authlayout authentication={true}>
            {' '}
            <AddPost />
          </Authlayout>
        )
      }, {
        path: '/edit-post:slug',
        element: (
          <Authlayout authentication>
            {' '}
            <Editpost />
          </Authlayout>
        )
      }, {
        path: '/post/:slug',
        element: <Post />
      }]
  }])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>

)
