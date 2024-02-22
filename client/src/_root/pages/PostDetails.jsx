import { useParams, useNavigate, Link } from "react-router-dom"

import { FiSend } from "react-icons/fi";

import { Button } from "../../components/ui/button";
import Loader from "../../components/shared/Loader"
import { UserContext } from "../../context/AuthContext"
import { multiFormatDateString } from "../../lib/utils";

import { useDeletePost, useGetPostById, useCreateComment } from "../../lib/react-query/queries"; 
import PostStats from "../../components/shared/PostStats";
import CommentList from "../../components/shared/CommentList"
import { useState } from "react";

export default function PostDetails(){
    const navigate = useNavigate();
    const { id : postId } = useParams();
    const { token, user } = UserContext();
    const [commentValue, setCommentValue] = useState("")

    const { data : post, isLoading } = useGetPostById(token, postId);
    const { mutate : deletePost } = useDeletePost();
    const { mutateAsync: createComment, isLoading: isCreatingComment } = useCreateComment();

    function handleDeletePost(){
        deletePost({ postId : postId, token : token })
        navigate(-1);
    }

    async function submitComment(){
        let reqBody = {
            content : commentValue,
            postId : post._id
        }
        await createComment({ data : reqBody, token : token });
        setCommentValue("")
    }

    console.log("data", post)
    
    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={()=>navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost"
                >
                    <img
                        src="../../../icons/back.svg"
                        alt="back"
                        width={24}
                        height={24} 
                    />
                    <p className="small-medium lg:base-medium">Back</p>
                </Button>
            </div>

            {isLoading && !post ? (
                <Loader/>
            ) : (
                <div className="post_details-card">
                    <img
                        src={post?.imageUrl}
                        alt="post-image"
                        className="post_details-img"
                    />

                    <div className="post_details-info">
                        <div className="flex-between w-full">
                            <div className="flex-col flex-1 w-full small-medium lg:base-regular">
                                <Link
                                    to={`/profile/${post?.creator._id}`}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={post?.creator.imageUrl || "../../../icons/profile-placeholder.svg"} 
                                        alt="creator"
                                        className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                                    />
                                    <div className="flex gap-1 flex-col">
                                        <p className="base-medium lg:body-bold text-light-1">
                                            {post?.creator.name}
                                        </p>
                                        <div className="flex-center gap-2 text-light-3">
                                            <p className="subtle-semibold lg:small-regular">
                                                {multiFormatDateString(post.createdAt)}
                                            </p>
                                            -
                                            <p className="subtle-semibold lg:small-regular">
                                                {post.location}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <div className="flex flex-1 w-full items-baseline mt-5 gap-x-2">
                                    <p>{post.caption}</p>
                                    <ul className="flex gap-1 mt-2">
                                        {post.tags[0].split(',').map((tag,index)=>(
                                            <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                                #{tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex-center gap-4">
                                <Link
                                    to={`/edit/${post._id}`}
                                    className={` ${user._id !== post.creator._id && "hidden"}`}
                                >
                                    <img
                                        src="../../../icons/edit.svg"
                                        alt="edit"
                                        height={24}
                                        width={24}
                                    />
                                </Link>    
                                <Button
                                    onClick={handleDeletePost}
                                    variant="ghost"
                                    className={`post_details-delete_btn ${user._id !== post.creator._id && "hidden"}`}
                                >
                                    <img
                                        src="../../../icons/delete.svg"
                                        alt="delete"
                                        height={24}
                                        width={24}
                                    />
                                </Button>
                                
                            </div>   
                        </div>

                        <hr className="border w-full border-dark-4/80" />
                        
                        <CommentList commentData={post.comment}/>

                        <div className="w-full h-24 flex flex-col gap-x-10 justify-between">
                            <PostStats post={post} user={user} token={token}/>
                            <div className="h-2/5 flex justify-center items-center w-full gap-x-5">
                                <img 
                                    src={user.imageUrl || "../../../icons/profile-placeholder.svg"} 
                                    alt="profile-image"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="flex px-5 justify-center items-center w-full rounded bg-dark-4">
                                    <input 
                                        value={commentValue}
                                        placeholder="Write your comment..."
                                        onChange={(e)=>setCommentValue(e.target.value)}
                                        className="bg-dark-4 h-10 placeholder:text-light-4 focus:outline-none w-full"
                                    />
                                    <button onClick={submitComment} disabled={isCreatingComment}>
                                        <FiSend color="#fbbf24" size={20}/>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}