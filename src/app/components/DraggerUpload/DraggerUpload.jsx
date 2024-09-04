// // DraggerUpload.jsx
// import { useState } from 'react'
// import { Upload, Button, Popover } from 'antd'
// import { InboxOutlined } from '@ant-design/icons'
// import { useDispatch } from 'react-redux'
// import { createDatabase } from '../../redux/slices/chatSlice'

// const DraggerUpload = () => {
//   const [files, setFiles] = useState([])
//   const [popoverVisible, setPopoverVisible] = useState(false)
//   const dispatch = useDispatch()

//   const handleFileChange = info => {
//     const fileList = info.fileList.map(file => file.originFileObj)
//     setFiles(fileList)
//   }

//   const handleUpload = () => {
//     const fileBlobURLs = files.map(file => ({
//       name: file.name,
//       url: URL.createObjectURL(file)
//     }))
//     dispatch(
//       createDatabase({
//         files: fileBlobURLs,
//         folderName: null
//       })
//     )
//     setFiles([])
//     setPopoverVisible(false)
//   }

//   const content = (
//     <div>
//       <Upload.Dragger
//         onChange={handleFileChange}
//         directory
//         name='file'
//         beforeUpload={() => false}
//         fileList={files}
//         style={{
//           border: '2px dashed #d9d9d9',
//           borderRadius: '6px'
//         }}
//       >
//         <p className='ant-upload-drag-icon'>
//           <InboxOutlined />
//         </p>
//         <p className='ant-upload-text'>
//           Click or drag file to this area to upload
//         </p>
//         <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
//       </Upload.Dragger>
//       <Button type='primary' onClick={handleUpload}>
//         Upload Files
//       </Button>
//     </div>
//   )

//   return (
//     <Popover
//       content={content}
//       title='Upload Files'
//       trigger='click'
//       visible={popoverVisible}
//       onVisibleChange={setPopoverVisible}
//     >
//       <Button icon={<InboxOutlined />}>Upload Files</Button>
//     </Popover>
//   )
// }

// export default DraggerUpload
'use client'
import { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import sendIcon from '@/app/assets/InputBar/sendIcon.svg'
import Dragger from 'antd/es/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  createDatabase,
  fetchFolders,
  queryDatabase
} from '../../redux/slices/chatSlice'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import starImage from '@/app/assets/hero/star.svg'

const DraggerUpload = () => {
  const searchParams = useSearchParams()
  const database = searchParams.get('database')
  const dispatch = useDispatch()
  const email = useSelector(state => state.user.email)

  const [form] = Form.useForm()
  const [files, setFiles] = useState([])
  const [folderExist, setFolderExist] = useState(false)
  const [directoryName, setDirectoryName] = useState(database)
  const [showFiles, setShowFiles] = useState(false)
  useEffect(() => {
    setDirectoryName(database)
    if (database) {
      setFolderExist(true)
      setShowFiles(false)
    } else {
      setFolderExist(false)
      setShowFiles(true)
    }
  }, [database])

  const onFinish = values => {
    const { message } = values
    const fileBlobURLs = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }))
    if (!message && !directoryName) {
      return
    } else if (message) {
      toast.promise(
        dispatch(
          queryDatabase({
            query: message,
            database: directoryName,
            email
          })
        ),
        {
          loading: message,
          success: <b></b>,
          error: <b>Something Went Wrong.</b>
        }
      )
    } else {
      dispatch(
        createDatabase({
          files: fileBlobURLs,
          folder_name: directoryName,
          email
        })
      )
    }

    // Reset form fields and file list
    form.resetFields()
    setShowFiles(false)
    if (folderExist) {
      setShowFiles(false)
      return
    }
    dispatch(fetchFolders(email))
    setDirectoryName(null)
    setFiles([])
    setShowFiles(true)
  }

  const handleFileChange = info => {
    const fileList = info.fileList.map(file => file.originFileObj)
    setFiles(fileList)
    if (fileList.length > 0) {
      const path = fileList[0].webkitRelativePath
      const dirName = path.substring(0, path.indexOf('/'))

      setDirectoryName(dirName)
    } else {
      setDirectoryName(null)
    }
  }

  return (
    <div className='flex items-center p-2  justify-center  w-full flex-col h-screen'>
      <Form
        form={form}
        name='chat_input'
        onFinish={onFinish}
        className='w-full bg-white rounded-lg shadow-lg flex flex-col md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]'
      >
        <div className='flex p-4 gap-2 w-full flex-col'>
          <Dragger
            onChange={handleFileChange}
            directory
            name='file'
            className={` flex  flex-col gap-2 ${
              directoryName ? '' : 'input_box'
            }`}
            beforeUpload={() => {
              return false
            }}
            style={{
              border: '2px dashed #d9d9d9',
              borderRadius: '6px'
            }}
          >
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
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>

          <div className='flex justify-between gap-2'>
            <span></span>
            {showFiles ? (
              <></>
            ) : (
              <Form.Item
                name='message'
                rules={[{ required: true, message: 'Please enter a message' }]}
                className='w-full m-0'
              >
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 10 }}
                  placeholder='Type your message here...'
                  className='rounded-md w-full my-0 border-none p-4'
                />
              </Form.Item>
            )}

            <button
              type='submit'
              className='flex items-center gap-2 font-semibold text-md hover:bg-gray-200 bg-gray-100 transition ease-in-out delay-150 p-2 rounded-md'
            >
              Upload Database
              <img src={sendIcon.src} alt='sendIcon' />
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default DraggerUpload
