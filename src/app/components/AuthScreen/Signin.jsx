import { signIn } from '@/auth'
import bgImage from '@/app/assets/auth/auth.webp'
import React from 'react'
import './style.css'
const Signin = () => {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='flex w-[100%] lg:w-[50%] flex-col items-start justify-center p-10 md:p-20 h-screen gap-4'>
        <p className='text-4xl  font-semibold'>Continue to knowledgeminer</p>
        <div className='flex gap-4 flex-col sm:flex-row'>
          <form
            action={async () => {
              'use server'
              await signIn('google', { redirectTo: '/' })
            }}
          >
            <button type='submit' className='login-with-google-btn'>
              Signin with Google
            </button>
          </form>
          {/* <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <button type="submit" className="login-with-microsoft-btn">
              Signin with Microsoft
            </button>
          </form> */}
        </div>
      </div>
      <div className='w-[35%] lg:w-[50%] hidden md:block h-screen overflow-hidden'>
        <span className='w-full'>
          <img src={bgImage.src} className='bgImage' />
        </span>
      </div>
    </div>
  )
}

export default Signin
