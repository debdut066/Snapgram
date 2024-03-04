import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = () => {
  return (
    <div className="flex flex-1">
        <div className="flex flex-col items-center w-full max-w-5xl gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
            <div className="flex-start gap-3 justify-start w-full ">
                <IoIosNotificationsOutline size={35} className='invert-white'/>
                <h2 className="h3-bold md:h2-bold text-left w-full">Notification</h2>
            </div>
            <div className='flex flex-col h-full w-full lg:w-[834px]'>
                <div className='flex items-center w-full h-20 gap-x-5'>
                    <span className='flex justify-center h-[36px] w-[36px] bg-[#1F1F22] rounded-full'>
                        <img
                            src='../../../icons/like.svg'
                            alt="like"
                            height={20}
                            width={20}
                        />
                    </span>
                    <div className='flex items-center gap-x-5 h-[60px] w-full lg:w-[300px]'>
                        <img
                            src='../../../icons/profile-placeholder.svg'
                            className='w-[50px] h-[50px]'
                            alt='profile-image'
                        />
                        <span className=''>
                            <h2 className='font-semibold text-sm text-[#EFEFEF]'>Edname liked your post "Nature Love"</h2>
                            <p className='text-xs text-[#7878A3]'>4 minutes ago</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification