import { Link } from "react-router-dom"

import { multiFormatDateString } from "../../lib/utils"
import { UserContext } from "../../context/AuthContext"
import PostStats from "./PostStats"

export default function PostCard({ post }){
  const { user,token } = UserContext();

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator._id}`}>
            <img 
              src={post.creator?.imageUrl || "../../../icons/profile-placeholder.svg"}
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link>
          <img 
            src="../../../icons/edit.svg"
            alt="edit"
            height={20}
            width={20}
          />
        </Link>
      </div>

      <Link to={`/post/${post._id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.name}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag,index)=>(
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          className="post-card_img"
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
        />
      </Link>
      <PostStats post={post} userId={user._id} token={token}/>
    </div>
  )
}