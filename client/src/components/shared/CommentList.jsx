import React from 'react'
import { formatTimestamp } from '../../lib/utils' 

export default function CommentList({ commentData }){
  return (
    <div className='h-2/5 w-full flex flex-col justify-center items-center xs:hidden sm:hidden md:hidden lg:block'>
      {commentData.map((comment)=>(
        <div className='flex justify-between w-full h-fit' key={comment._id}>
          <div className='flex gap-x-2'>
            <img 
              src={comment.creator.imageUrl || "../../../icons/profile-placeholder.svg"} 
              alt="profile-image"
              className="h-8 w-8 rounded-full"
            />
            <div className='flex flex-col gap-y-2'>
              <span className='flex gap-x-2'>
                <p className='text-sm text-[#7878A3]'>{comment.creator.username}</p>
                <p className='text-sm'>{comment.content}</p>
              </span>
            <span className='flex gap-x-2 items-center'>
              <p className='text-xs text-[#7878A3]'>{formatTimestamp(new Date(comment.createdAt).getTime( ))}</p>
              <button className="text-xs text-[#EFEFEF]">Reply</button>
            </span>
            </div>
          </div>
          <div className='flex items-baseline gap-x-2'>
            <img
              src="../../../icons/like.svg"
              alt="like"
              height={16}
              width={16}
              className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium text-[#7878A3]">{comment.l_c} likes</p>
          </div>
        </div>
      ))}
    </div>
  )
}