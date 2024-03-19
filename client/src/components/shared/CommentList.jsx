import React from 'react'

import { formatTimestamp } from '../../lib/utils' 
import Loader from './Loader'
import { useDeleteComment, useLikeComment } from '../../lib/react-query/queries'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function CommentList({ 
  commentData, 
  token,
  user, 
  postId, 
  hasNextPage,
  forwardRef
}){
  
  const { mutateAsync : likeComment } = useLikeComment(postId);
  const { mutateAsync : deleteComment } = useDeleteComment(postId)

  const handleLikeForComment = async (e, commentId) => {
    e.stopPropagation();
    await likeComment({ commentId : commentId, token : token});
  }

  const handleDeleteComment = async (e, commentId) => {
    e.stopPropagation();
    await deleteComment({ commentId : commentId, token : token});
  } 
  
  return (
    <div className='h-[138px] w-full overflow-scroll custom-scrollbar hidden lg:flex lg:flex-col justify-evenly items-center gap-y-2 max-xs:hidden'>
      {commentData.map((comment)=>(
        <AlertDialog key={comment._id} >
          <div className='flex justify-between w-full h-fit pr-3 my-3'>
          <AlertDialogTrigger>
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
                {/* <button className="text-xs text-[#EFEFEF]">Reply</button> */}
              </span>
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-black border-none'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='bg-black'>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className='bg-white text-black hover:bg-white hover:text-black'
              onClick={(e) => handleDeleteComment(e, comment._id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

          <button className='flex items-center gap-x-2' onClick={(e) => handleLikeForComment(e, comment._id)}>
            <img
              src={comment.likes.includes(user._id) 
                ?  "../../../icons/liked.svg"
                :   "../../../icons/like.svg"
              }
              alt='like'
              height={16}
              width={16}
              className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium text-[#7878A3]">{comment.l_c}</p>
          </button>
          </div>
        </AlertDialog>
      ))}

    { hasNextPage && (
        <div ref={forwardRef} className='mt-10'>
          <Loader/>
        </div>
      )
    }
    </div>
  )
}