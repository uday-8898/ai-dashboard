// "use client";
// import ChatSpace from "@/app/components/ChatSpace/ChatSpace";
// import DatabaseSidebar from "@/app/components/DatabaseSidebar/DatabaseSidebar";
// import InputBar from "@/app/components/InputBar/InputBar";
// import PDFViewer from "@/app/components/PDFViewer/PDFViewer";
// import {
//   setChatList,
//   setCurrentCitationTab,
//   setShowCitationTab,
// } from "@/app/redux/slices/chatSlice";
// import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Tabs } from "antd";
// import { useParams } from "next/navigation";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ScrollToBottom from "react-scroll-to-bottom";
// import { css } from "@emotion/css";

// const items = [
//   {
//     key: "1",
//     label: "Citations",
//     children: <PDFViewer />,
//   },
// ];
// const Operations = () => {
//   const dispatch = useDispatch();
//   const handleCloseCitation = () => {
//     dispatch(setCurrentCitationTab(null));
//     dispatch(setShowCitationTab(false));
//   };
//   return (
//     <button onClick={handleCloseCitation} className="text-[16px] dark-btn">
//       <CloseCircleOutlined /> Close
//     </button>
//   );
// };

// const CitationTabs = () => (
//   <Tabs
//     tabBarExtraContent={<Operations />}
//     defaultActiveKey="1"
//     items={items}
//   />
// );

// const DatabasePage = () => {
//   const showCitatationTabs = useSelector(
//     (state) => state.chat.showCitatationTabs
//   );
//   const dispatch = useDispatch();
//   const handleClearChat = () => {
//     dispatch(setChatList([]));
//     dispatch(setCurrentCitationTab(null));
//     dispatch(setShowCitationTab(false));
//   };
//   const currentFolder = useParams();
//   const ROOT_CSS = css({
//     height: "70vh",
//     width: "100%",
//   });
//   return (
//     <div>
//       {" "}
//       <>
//         <button
//           onClick={handleClearChat}
//           className="  fixed right-0 m-2 z-[100] dark-btn"
//         >
//           <DeleteOutlined /> Clear Chat
//         </button>
//         <div className="flex w-full  space-between">
//           <ScrollToBottom className={"w-full overflow-auto"}>
//             <ChatSpace />
//           </ScrollToBottom>
//           <div
//             className={`h-screen p-8 pt-[76px] ${
//               showCitatationTabs ? "w-full" : "hidden"
//             }`}
//           >
//             {showCitatationTabs ? <CitationTabs /> : <></>}
//           </div>
//         </div>
//         <div className="w-full fixed bottom-[80px] md:bottom-0 right-0">
//           <InputBar directoryName={currentFolder.database} />
//         </div>
//       </>
//     </div>
//   );
// };

// export default DatabasePage;
'use client'
import ChatSpace from '@/app/components/ChatSpace/ChatSpace'
import DatabaseSidebar from '@/app/components/DatabaseSidebar/DatabaseSidebar'
import InputBar from '@/app/components/InputBar/InputBar'
import PDFViewer from '@/app/components/PDFViewer/PDFViewer'
import {
  fetchDatabaseHistory,
  setChatList,
  setCurrentCitationTab,
  setShowCitationTab
} from '@/app/redux/slices/chatSlice'
import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollToBottom from 'react-scroll-to-bottom'
import { css } from '@emotion/css'

const items = [
  {
    key: '1',
    label: 'Citations',
    children: <PDFViewer />
  }
]

const Operations = () => {
  const dispatch = useDispatch()
  const handleCloseCitation = () => {
    dispatch(setCurrentCitationTab(null))
    dispatch(setShowCitationTab(false))
  }
  return (
    <button onClick={handleCloseCitation} className='text-[16px] dark-btn'>
      <CloseCircleOutlined /> Close
    </button>
  )
}

const CitationTabs = () => (
  <Tabs
    tabBarExtraContent={<Operations />}
    defaultActiveKey='1'
    items={items}
  />
)

const DatabasePage = () => {
  const { database } = useParams()
  const user_id = useSelector(state => state.user.user_id)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const showCitatationTabs = useSelector(state => state.chat.showCitatationTabs)
  const dispatch = useDispatch()
  const handleClearChat = () => {
    dispatch(setChatList([]))
    dispatch(setCurrentCitationTab(null))
    dispatch(setShowCitationTab(false))
  }
  const currentFolder = useParams()
  const ROOT_CSS = css({
    height: '80vh',
    width: '100%'
  })
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(
        fetchDatabaseHistory({
          database,
          user_id
        })
      )
    }
  }, [isAuthenticated])
  return (
    <div>
      <button
        onClick={handleClearChat}
        className='fixed right-0 m-2 z-[100] dark-btn'
      >
        <DeleteOutlined /> Clear Chat
      </button>
      <div className='flex w-full space-between'>
        <div className='w-full overflow-auto'>
          <ScrollToBottom className={ROOT_CSS}>
            <ChatSpace />
          </ScrollToBottom>
        </div>
        <div
          className={`h-screen p-8 pt-[76px] ${
            showCitatationTabs ? 'w-full' : 'hidden'
          }`}
        >
          {showCitatationTabs ? <CitationTabs /> : null}
        </div>
      </div>
      <div className='w-full fixed bottom-[80px] md:bottom-0 right-0'>
        <InputBar directoryName={currentFolder.database} />
      </div>
    </div>
  )
}

export default DatabasePage
