import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loginpage from './pages/Login'
import Singuppg from './pages/Singup'
import Allpost from './pages/AllPost'
import Home from './pages/Home'
import Protected from './components/Authlayout'
import AddPost from './pages/Postform'
import Editpost from './pages/Editpost'
import Post from './pages/Post'

const router = createBrowserRouter([{
  path:'/',
  elementn:<App />,
  children:[
    {
    path:'/',
    element:<Home />,
    },
    {
      path:'/login',
      element:(
        <Protected authentication={false}>
          <Loginpage/>
        </Protected>
      )
    },{
      path:'/singup',
      element:(
        <Protected authentication={false}>
          <Singuppg/>
        </Protected>
      ),
    },{
      path:'/all-post',
      element:(
        <Protected authentication={true}>
          {' '}
          <Allpost/>
        </Protected>
      )
    },{
      path:'/add-post',
      element:(
        <Protected authentication={true}>
          {' '}
          <AddPost/>
        </Protected>
      )
    },{
      path:'/edit-post:slug',
      element:(
        <Protected authentication>
          {' '}
          <Editpost/>
        </Protected>
      )
    },{
      path:'/post/:slug',
      element:<Post/>
    }]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
     <RouterProvider router={router}/>
    </Provider>

  </React.StrictMode>
  
)
