import { Card } from 'antd'
import React, { useEffect } from 'react'
import DashboardCard from './DashboardCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserSummary } from '@/app/redux/slices/userSlice'

const DashboardCards = () => {
  const dispatch = useDispatch()

  const user_id = useSelector(state => state.user.user_id)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserSummary(user_id))
    }
  }, [isAuthenticated])
  return (
    <div className='flex flex-col  m-auto 2xl:max-w-[1000px]  h-full w-full'>
      <DashboardCard />
    </div>
  )
}

export default DashboardCards
