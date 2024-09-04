// /* eslint-disable react/prop-types */
// import { useLocation } from 'react-router-dom'
// import starImage from './../../assets/hero/star.svg'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { v4 as uuidv4 } from 'uuid'
// import { ReqCard, ResCard } from './ResCard'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// const ResponseCard = ({ chat, index }) => {
//   const query = chat.user_question
//   const response = chat.answer
//   const isEven = index % 2 === 0
//   return (
//     <div
//       key={uuidv4()}
//       className={`flex text-sm gap-4 py-2 flex-col ${
//         isEven ? 'items-end' : 'items-start'
//       }`}
//     >
//       {query && (
//         <div
//           key={uuidv4()}
//           className={`w-full ${isEven ? 'text-right' : 'text-left'}`}
//         >
//           <ReqCard key={uuidv4()} query={query} />
//         </div>
//       )}
//       {response && (
//         <div
//           key={uuidv4()}
//           className={`w-full ${isEven ? 'text-left' : 'text-right'}`}
//         >
//           <ResCard index={index} key={uuidv4()} response={response} />
//         </div>
//       )}
//     </div>
//   )
// }

// const ChatSpace = () => {
//   const location = useLocation()
//   const [folderName, setFolderName] = useState('')
//   const chatList = useSelector(state => state.chat.chatList)
//   const loading = useSelector(state => state.chat.status)

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search)
//     const folder = queryParams.get('folder')
//     setFolderName(folder)
//   }, [location.search])

//   return (
//     <div className={`flex gap-4 p-8  m-auto max-w-[1000px]`}>
//       {folderName && chatList.length > 0 ? (
//         <>
//           <div className='flex flex-col w-full h-full'>
//             {chatList.map((chat, index) => {
//               return <ResponseCard chat={chat} index={index} key={uuidv4()} />
//             })}
//             {loading == 'loading' ? (
//               <div className='  max-w-[600px] query_card'>
//                 <div className='animate-bounce  max-w-[600px]'>
//                   <img
//                     src={starImage}
//                     className='py-4 w-[24px] animate-pulse'
//                   />
//                 </div>
//                 <Skeleton />
//                 <Skeleton count={5} />
//               </div>
//             ) : (
//               <></>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className='bg-red fixed left-0 mt-[10vh]  w-full'>
//           <div className='flex flex-col items-center gap-4'>
//             <div className='flex flex-col items-center gap-4'>
//               <div className='max-w-[70px]'>
//                 <img src={starImage} className='w-full h-full' />
//               </div>
//               <span className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center'>
//                 Chat With your data
//               </span>
//             </div>
//             <p className='text-sm text-center font-bold'>
//               Upload You Data or Try Existing Database
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ChatSpace
'use client'
/* eslint-disable react/prop-types */
import { usePathname, useSearchParams } from 'next/navigation'
import starImage from '@/app/assets/hero/star.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { ReqCard, ResCard } from './ResCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Spin } from 'antd'
const ResponseCard = ({ chat, index }) => {
  const query = chat.user_question
  const response = chat.answer
  const isEven = index % 2 === 0
  return (
    <div
      key={uuidv4()}
      className={`flex text-sm gap-4 py-2 flex-col ${
        isEven ? 'items-end' : 'items-start'
      }`}
    >
      {query && (
        <div
          key={uuidv4()}
          className={`w-full ${isEven ? 'text-right' : 'text-left'}`}
        >
          <ReqCard key={uuidv4()} query={query} />
        </div>
      )}
      {response && (
        <div
          key={uuidv4()}
          className={`w-full ${isEven ? 'text-left' : 'text-right'}`}
        >
          <ResCard index={index} key={uuidv4()} response={response} />
        </div>
      )}
    </div>
  )
}

const ChatSpace = () => {
  const chatList = useSelector(state => state.chat.chatList)
  const loading = useSelector(state => state.chat.loading)

  return (
    <div className={`flex gap-4 p-4 pt-[56px]  m-auto max-w-[1000px]`}>
      {loading ? (
        <div className='flex items-center h-full justify-center w-full'>
          <Spin size='large' />
        </div>
      ) : (
        <>
          {chatList.length > 0 ? (
            <>
              <div className='flex flex-col w-full h-full'>
                {chatList.map((chat, index) => {
                  return (
                    <ResponseCard chat={chat} index={index} key={uuidv4()} />
                  )
                })}
                {loading == 'loading' ? (
                  <div className='  max-w-[600px] query_card'>
                    <div className='animate-bounce  max-w-[600px]'>
                      <img
                        src={starImage.src}
                        className='py-4 w-[24px] animate-pulse'
                      />
                    </div>
                    <Skeleton />
                    <Skeleton count={5} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <div className='w-full fixed top-[10em] md:bottom-0 right-0'>
                <div className='w-full'>
                  <div className='flex flex-col items-center gap-4'>
                    <div className='flex flex-col items-center gap-4'>
                      <div className='max-w-[70px]'>
                        <img src={starImage.src} className='w-full h-full' />
                      </div>
                      <span className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center'>
                        Chat With your data
                      </span>
                    </div>
                    <p className='text-sm text-center font-bold'>
                      Upload You Data or Try Existing Database
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ChatSpace
