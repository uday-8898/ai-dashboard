// import React, { useState } from "react";
// import toggle from "@/app/assets/sidebar/database.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
// import {
//   setChatList,
//   setCurrentCitationTab,
//   setShowCitationTab,
// } from "@/app/redux/slices/chatSlice";
// import newDatabase from "@/app/assets/sidebar/addNew.svg";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import useWindowWidth from "@/app/hooks/useWindowWidth";

// const DahboardSidebarTab = ({
//   folderTab,
//   isActive,
//   onClick,
//   iconSrc,
//   addNewDb,
// }) => {
//   return (
//     <span
//       onClick={onClick}
//       className={`cursor-pointer w-full flex items-center gap-4 ${
//         isActive ? "active_folder_tab" : "folder_tab"
//       } ${addNewDb ? "new_database_tab" : ""}`}
//     >
//       {folderTab}
//       {iconSrc && (
//         <img src={iconSrc.src} alt={`${folderTab} icon`} className="w-[24px]" />
//       )}
//     </span>
//   );
// };
// const DatabaseSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const router = useRouter();

//   const folders = useSelector((state) => state.chat.folders);

//   function handleDatabaseSidebar() {
//     setIsOpen((prev) => !prev);
//   }
//   const [activeTab, setActiveTab] = useState();
//   const dispatch = useDispatch();
//   const handleTabClick = (Tab) => {
//     const lowerCaseTab = Tab.toLowerCase();
//     setActiveTab(Tab);
//     dispatch(setChatList([]));
//     dispatch(setCurrentCitationTab(null));
//     dispatch(setShowCitationTab(false));
//     router.push(`/databases/${lowerCaseTab}`);
//     return;
//   };
//   return (
//     <div className="flex flex-col relative gap-2 pr-10 m-2 z-[9999]">
//       {" "}
//       <div className="fixed flex flex-col gap-2">
//         <button
//           onClick={handleDatabaseSidebar}
//           className="w-[54px] h-[54px] bg-black flex items-center justify-center  p-2 rounded-full"
//         >
//           <img src={toggle.src} alt="close toggle" />
//         </button>
//         {isOpen ? (
//           <div>
//             <div
//               className={`bg-black rounded-xl z-[10]  overflow-hidden  text-grayLight p-4 transition-width duration-300 w-[280px]`}
//             >
//               <div className="flex flex-col justify-between overflow-y-auto ">
//                 <div className="flex flex-col gap-2 folder_tabs tempThumb max-h-[400px]">
//                   <DahboardSidebarTab
//                     folderTab={"Create New Database"}
//                     key={uuidv4()}
//                     isActive={"databases"}
//                     addNewDb={true}
//                     onClick={() => handleTabClick("/")}
//                     iconSrc={newDatabase}
//                   />
//                   {folders.map((folderTab) => (
//                     <DahboardSidebarTab
//                       folderTab={folderTab}
//                       key={uuidv4()}
//                       isActive={folderTab === activeTab}
//                       onClick={() => handleTabClick(folderTab)}
//                     />
//                   ))}
//                   {folders.map((folderTab) => (
//                     <DahboardSidebarTab
//                       folderTab={folderTab}
//                       key={uuidv4()}
//                       isActive={folderTab === activeTab}
//                       onClick={() => handleTabClick(folderTab)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DatabaseSidebar;
import React, { useState } from "react";
import toggle from "@/app/assets/sidebar/database.svg";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  setChatList,
  setCurrentCitationTab,
  setShowCitationTab,
} from "@/app/redux/slices/chatSlice";
import newDatabase from "@/app/assets/sidebar/addNew.svg";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const DahboardSidebarTab = ({
  folderTab,
  isActive,
  onClick,
  iconSrc,
  addNewDb,
}) => {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer w-full flex items-center gap-4 ${
        isActive ? "active_folder_tab" : "folder_tab"
      } ${addNewDb ? "new_database_tab" : ""}`}
    >
      {folderTab}
      {iconSrc && (
        <img src={iconSrc.src} alt={`${folderTab} icon`} className="w-[24px]" />
      )}
    </span>
  );
};

const DatabaseSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const router = useRouter();
  const folders = useSelector((state) => state.chat.folders);
  const [activeTab, setActiveTab] = useState();
  const dispatch = useDispatch();

  function handleDatabaseSidebar() {
    setIsOpen((prev) => !prev);
  }

  const handleTabClick = (Tab) => {
    const lowerCaseTab = Tab.toLowerCase();
    setActiveTab(Tab);
    dispatch(setChatList([]));
    dispatch(setCurrentCitationTab(null));
    dispatch(setShowCitationTab(false));
    router.push(`/databases/${lowerCaseTab}`);
    setIsOpen((prev) => !prev);

    return;
  };

  // Filter folders based on search query
  const filteredFolders = folders.filter((folderTab) =>
    folderTab.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col relative gap-2 pr-10 m-2 z-[9999]">
      <div className="fixed flex flex-col gap-2">
        <button
          onClick={handleDatabaseSidebar}
          className=" h-[54px] w-[54px] gap-2 text-grayLight bg-black flex items-center justify-center p-2 rounded-full"
        >
          <img src={toggle.src} alt="close toggle" />
        </button>
        {isOpen ? (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ ease: "easeIn", duration: 0.3 }}
          >
            <div>
              <div
                className={`bg-black rounded-xl z-[10] overflow-hidden text-grayLight  transition-width duration-300 w-[280px] p-2`}
              >
                <div className="flex flex-col justify-between overflow-y-auto p-2">
                  <input
                    type="text"
                    placeholder="Search databases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-gray bg-grayDarkOpac p-2 mb-4 rounded-md outline-none"
                  />
                  <div className="flex flex-col gap-2 folder_tabs tempThumb max-h-[400px]">
                    <DahboardSidebarTab
                      folderTab={"Create New Database"}
                      key={uuidv4()}
                      isActive={"databases"}
                      addNewDb={true}
                      onClick={() => handleTabClick("/")}
                      iconSrc={newDatabase}
                    />
                    {filteredFolders.map((folderTab) => (
                      <DahboardSidebarTab
                        folderTab={folderTab}
                        key={uuidv4()}
                        isActive={folderTab === activeTab}
                        onClick={() => handleTabClick(folderTab)}
                      />
                    ))}
                    {filteredFolders.length == 0 && (
                      <span className="text-center">No database Found</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DatabaseSidebar;
