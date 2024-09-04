'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/store'
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { Toaster } from 'react-hot-toast'
import { loginUser } from './redux/slices/userSlice'

const SessionWraper = ({ children }) => {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  useEffect(() => {
    if (session) {
      dispatch(
        loginUser({ name: session.user.name, email: session.user.email })
      )
    }
  }, [session])

  return <>{children}</>
}

const App = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster />
      <SessionWraper>
        <DashboardLayout>{children}</DashboardLayout>
      </SessionWraper>
    </Provider>
  )
}

export default App
