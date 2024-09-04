'use client'
import useWindowWidth from '@/app/hooks/useWindowWidth'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  const width = useWindowWidth()
  return (
    <div className={width > 765 ? 'flex' : ' '}>
      <Header />
      <div className='z-[1000] h-0'>
        <Sidebar />
      </div>
      <div className='h-screen pb-[80px]  md:pb-0 w-full overflow-y-auto overflow-x-hidden'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
