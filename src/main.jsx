import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Route/Route.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='max-w-screen-xl mx-auto'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  </StrictMode>,
)
