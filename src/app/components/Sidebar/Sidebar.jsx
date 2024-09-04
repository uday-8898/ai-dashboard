// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams, usePathname, useRouter } from 'next/navigation'
// import { useSearchParams } from 'next/navigation'

// import menu from '@/app/assets/sidebar/menu.svg'
// import homeIcon from '@/app/assets/sidebar/menu.svg'
// import databaseIcon from '@/app/assets/sidebar/database.svg'
// import billingIcon from '@/app/assets/sidebar/bill.svg'
// import plansIcon from '@/app/assets/sidebar/plans.svg'
// import logOutIcon from '@/app/assets/sidebar/logout.svg'
// import {
//   setChatList,
//   setCurrentCitationTab,
//   setShowCitationTab
// } from '@/app/redux/slices/chatSlice'
// import { setNavTab } from '@/app/redux/slices/navSlice'
// import useWindowWidth from '@/app/hooks/useWindowWidth'
// import { signOut } from 'next-auth/react'

// const SidebarTab = ({ folderTab, isActive, onClick, iconSrc }) => {
//   return (
//     <span
//       onClick={onClick}
//       className={`cursor-pointer w-full flex items-center gap-4 ${
//         isActive ? 'active_folder_tab' : 'folder_tab'
//       }`}
//     >
//       {iconSrc && (
//         <img src={iconSrc.src} alt={`${folderTab} icon`} className='w-[24px]' />
//       )}
//       {folderTab}
//     </span>
//   )
// }
// const MobileSidebarTab = ({ folderTab, isActive, onClick, iconSrc }) => {
//   return (
//     <span
//       onClick={onClick}
//       className={`cursor-pointer w-full h-full justify-center flex items-center gap-4 ${
//         isActive ? 'active_folder_tab' : 'folder_tab'
//       }`}
//     >
//       {iconSrc && <img src={iconSrc.src} alt={`${folderTab} icon`} />}
//     </span>
//   )
// }

// const Sidebar = () => {
//   const dispatch = useDispatch()
//   const tab = useSelector(state => state.navigation.navTab)
//   const [isCollapsed, setIsCollapsed] = useState(true)
//   const [activeTab, setActiveTab] = useState(tab)
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const width = useWindowWidth()
//   const pathName = usePathname()
//   console.log(pathName)
//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed)
//   }

//   const handleTabClick = Tab => {
//     const lowerCaseTab = Tab.toLowerCase()
//     setActiveTab(Tab)
//     dispatch(setChatList([]))
//     dispatch(setCurrentCitationTab(null))
//     dispatch(setShowCitationTab(false))
//     dispatch(setNavTab(Tab))
//     if (lowerCaseTab == 'home') {
//       router.push('/')
//       return
//     }
//     router.push(lowerCaseTab)
//     return
//   }

//   const tabs = [
//     { name: 'Home', icon: homeIcon },
//     { name: 'Database', icon: databaseIcon },
//     { name: 'Billing', icon: billingIcon },
//     { name: 'Plans', icon: plansIcon }
//   ]

//   return (
//     <>
//       {width > 765 ? (
//         <div
//           className={`bg-black z-[10] pt-[76px] pb-[70px] overflow-hidden max-h-screen h-full text-grayLight p-4 transition-width duration-300 ${
//             isCollapsed ? 'w-16' : 'w-[260px]'
//           }`}
//         >
//           <button onClick={toggleSidebar} className='mb-4'>
//             <img src={menu.src} alt='menu icon' />
//           </button>
//           {/* Sidebar content */}
//           {!isCollapsed && (
//             <div className='flex flex-col justify-between overflow-y-auto h-screen max-h-[calc(100vh-157px)] '>
//               <div className='flex flex-col gap-2 folder_tabs'>
//                 {tabs.map(tab => (
//                   <SidebarTab
//                     key={tab.name}
//                     folderTab={tab.name}
//                     isActive={activeTab === tab.name}
//                     onClick={() => handleTabClick(tab.name)}
//                     iconSrc={tab.icon}
//                   />
//                 ))}
//               </div>
//               <button
//                 onClick={() => signOut()}
//                 className='flex items-center gap-4 folder_tab'
//               >
//                 <img
//                   src={logOutIcon.src}
//                   alt='menu icon'
//                   className='w-[24px]'
//                 />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div
//           className={`bg-black rounded-t-xl z-[10] fixed bottom-0 w-screen pt-[18px] pb-[18px] overflow-hidden text-grayLight p-4 transition-width duration-300`}
//         >
//           {/* Sidebar content */}
//           <div className='flex overflow-y-auto justify-between items-center padding-4'>
//             {tabs.map(tab => (
//               <MobileSidebarTab
//                 key={tab.name}
//                 folderTab={tab.name}
//                 isActive={activeTab === tab.name}
//                 onClick={() => handleTabClick(tab.name)}
//                 iconSrc={tab.icon}
//               />
//             ))}
//             <button
//               className='cursor-pointer w-full h-full justify-center flex items-center gap-4'
//               onClick={() => signOut()}
//             >
//               <img src={logOutIcon.src} alt='menu icon' />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Sidebar

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import menu from '@/app/assets/sidebar/menu.svg'
import homeIcon from '@/app/assets/sidebar/home.svg'
import databaseIcon from '@/app/assets/sidebar/database.svg'
import billingIcon from '@/app/assets/sidebar/bill.svg'
import plansIcon from '@/app/assets/sidebar/plans.svg'
import logOutIcon from '@/app/assets/sidebar/logout.svg'
import logo from '@/app/assets/hero/comapanyLogo.png'
import {
  fetchFolders,
  setChatList,
  setCurrentCitationTab,
  setShowCitationTab
} from '@/app/redux/slices/chatSlice'
import { setNavTab } from '@/app/redux/slices/navSlice'
import useWindowWidth from '@/app/hooks/useWindowWidth'
import { signOut } from 'next-auth/react'
import DatabaseSidebar from '../DatabaseSidebar/DatabaseSidebar'

const SidebarTab = ({ folderTab, isActive, onClick, iconSrc }) => {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer w-full flex items-center gap-4 ${
        isActive ? 'active_folder_tab' : 'folder_tab'
      }`}
    >
      {iconSrc && (
        <img src={iconSrc.src} alt={`${folderTab} icon`} className='w-[24px]' />
      )}
      {folderTab}
    </span>
  )
}

const MobileSidebarTab = ({ folderTab, isActive, onClick, iconSrc }) => {
  return (
    <>
      <span
        onClick={onClick}
        className={`cursor-pointer w-full h-full justify-center flex items-center gap-4 ${
          isActive ? 'active_folder_tab' : 'folder_tab'
        }`}
      >
        {iconSrc && <img src={iconSrc.src} alt={`${folderTab} icon`} />}
      </span>
    </>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch()
  const tab = useSelector(state => state.navigation.navTab)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const email = useSelector(state => state.user.email)

  const [activeTab, setActiveTab] = useState(tab)
  const router = useRouter()
  const searchParams = useSearchParams()
  const width = useWindowWidth()
  const pathName = usePathname()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleTabClick = Tab => {
    const lowerCaseTab = Tab.toLowerCase()
    setActiveTab(Tab)
    dispatch(setChatList([]))
    dispatch(setCurrentCitationTab(null))
    dispatch(setShowCitationTab(false))
    dispatch(setNavTab(Tab))

    if (lowerCaseTab == 'home') {
      router.push('/')
      return
    }
    router.push(`/${lowerCaseTab}`)
    return
  }

  useEffect(() => {
    const currentTab = pathName.split('/')[1] || 'home'
    setActiveTab(currentTab.charAt(0).toUpperCase() + currentTab.slice(1))
  }, [pathName])
  useEffect(() => {
    dispatch(fetchFolders(email))
  }, [email])
  const tabs = [
    { name: 'Home', icon: homeIcon },
    { name: 'Databases', icon: databaseIcon },
    { name: 'Billing', icon: billingIcon },
    { name: 'Plans', icon: plansIcon }
  ]

  return (
    <>
      <div className='flex h-screen showclass '>
        <div
          className={`bg-black z-[10]  pb-[70px] overflow-hidden max-h-screen h-full text-grayLight p-4 transition-width duration-300 ${
            isCollapsed ? 'w-16' : 'w-[260px]'
          }`}
        >
          <div className='mb-4'>
            {!isCollapsed ? <img src={logo.src} alt='menu icon' /> : <></>}
          </div>
          <button onClick={toggleSidebar} className='mb-4 justify-self-end'>
            <img src={menu.src} alt='menu icon' />
          </button>
          {/* Sidebar content */}
          {!isCollapsed && (
            <div className='flex flex-col justify-between overflow-y-auto h-screen max-h-[calc(100vh-157px)] '>
              <div className='flex flex-col gap-2 folder_tabs'>
                {tabs.map(tab => (
                  <SidebarTab
                    key={tab.name}
                    folderTab={tab.name}
                    isActive={activeTab === tab.name}
                    onClick={() => handleTabClick(tab.name)}
                    iconSrc={tab.icon}
                  />
                ))}
              </div>
              <button
                onClick={() => signOut()}
                className='flex items-center gap-4 folder_tab'
              >
                <img
                  src={logOutIcon.src}
                  alt='menu icon'
                  className='w-[24px]'
                />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
        {activeTab == 'Databases' ? <DatabaseSidebar /> : <></>}
      </div>

      <div className='flex hideclass '>
        <div
          className={`bg-black rounded-t-xl z-[10] fixed bottom-0 w-screen pt-[18px] pb-[18px] overflow-hidden text-grayLight p-4 transition-width duration-300`}
        >
          {/* Sidebar content */}
          <div className='flex overflow-y-auto justify-between items-center padding-4'>
            {tabs.map(tab => (
              <MobileSidebarTab
                key={tab.name}
                folderTab={tab.name}
                isActive={activeTab === tab.name}
                onClick={() => handleTabClick(tab.name)}
                iconSrc={tab.icon}
              />
            ))}
            <button
              className='cursor-pointer w-full h-full justify-center flex items-center gap-4'
              onClick={() => signOut()}
            >
              <img src={logOutIcon.src} alt='menu icon' />
            </button>
          </div>
        </div>
        <div>{activeTab == 'Databases' ? <DatabaseSidebar /> : <></>}</div>
      </div>
    </>
  )
}

export default Sidebar
