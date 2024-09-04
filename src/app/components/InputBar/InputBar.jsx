// "use client";
// import { useEffect, useRef } from "react";
// import { Form, Input } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { queryDatabase, setChatList } from "../../redux/slices/chatSlice";
// import sendIcon from "@/app/assets/InputBar/sendIcon.svg";

// const InputBar = ({ directoryName }) => {
//   const dispatch = useDispatch();
//   const [form] = Form.useForm();
//   const chatList = useSelector((state) => state.chat.chatList);

//   const onFinish = (values) => {
//     console.log(values);
//     const { message } = values;
//     if (message) {
//       dispatch(setChatList([...chatList, { user_question: message }]));
//       dispatch(
//         queryDatabase({
//           query_string: message,
//           folder_name: directoryName,
//         })
//       );
//     }
//     form.resetFields();
//   };

//   return (
//     <Form
//       form={form}
//       name="chat_input"
//       onFinish={onFinish}
//       className="w-full m-auto py-4 p-2  rounded-lg flex md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]"
//     >
//       <div className="flex gap-2 w-full flex-col ">
//         <div className="flex justify-between gap-2 items-center">
//           <Form.Item
//             name="message"
//             rules={[{ required: false, message: "Please enter a message" }]}
//             className="w-full m-0  "
//             onPressEnter={onFinish}
//           >
//             <Input.TextArea
//               autoSize={{ minRows: 1, maxRows: 10 }}
//               placeholder="Chat with Your Data..."
//               className="rounded-2xl w-full my-0 border-2 p-3 text-lg"
//               onPressEnter={(values) => onFinish(values)}
//             />
//           </Form.Item>
//           <button type="submit">
//             <img src={sendIcon.src} alt="sendIcon" />
//           </button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default InputBar;
'use client'
import { useEffect, useRef } from 'react'
import { Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { queryDatabase, setChatList } from '../../redux/slices/chatSlice'
import sendIcon from '@/app/assets/InputBar/sendIcon.svg'

const InputBar = ({ directoryName }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const chatList = useSelector(state => state.chat.chatList)
  const email = useSelector(state => state.user.email)

  const onFinish = values => {
    const { message } = values
    if (message) {
      dispatch(setChatList([...chatList, { user_question: message }]))
      dispatch(
        queryDatabase({
          query: message,
          database: directoryName,
          email
        })
      )
    }
    form.resetFields()
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      form.submit()
    }
  }

  return (
    <Form
      form={form}
      name='chat_input'
      onFinish={onFinish}
      className='w-full m-auto py-4 p-2 rounded-lg flex md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]'
    >
      <div className='flex gap-2 w-full flex-col'>
        <div className='flex justify-between gap-2 items-center'>
          <Form.Item
            name='message'
            rules={[{ required: false, message: 'Please enter a message' }]}
            className='w-full m-0'
          >
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder='Chat with Your Data...'
              className='rounded-2xl w-full my-0 border-2 p-3 text-lg'
              onKeyPress={handleKeyPress}
            />
          </Form.Item>

          <button type='submit'>
            <img src={sendIcon.src} alt='sendIcon' />
          </button>
        </div>
      </div>
    </Form>
  )
}

export default InputBar
