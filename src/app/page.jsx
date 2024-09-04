'use client'
import React from 'react'
import Home from './components/Home/Home'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const tab = useSelector(state => state.navigation.navTab)

  return <Home />
}

export default Dashboard
