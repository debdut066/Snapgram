import { useParams, useNavigate, Link } from "react-router-dom"

import { Button } from "../../components/ui/button";
import Loader from "../../components/shared/Loader"
import { UserContext } from "../../context/AuthContext"
import { multiFormatDateString } from "../../lib/utils";

import { useDeletePost, useGetPostById } from "../../lib/react-query/queries"; 
import PostStats from "../../components/shared/PostStats";

export default function PostDetails(){
    const navigate = useNavigate();
    const { id : postId } = useParams();
    const { token, user } = UserContext();

    const { data : post, isLoading } = useGetPostById(token, postId);
    const { mutate : deletePost } = useDeletePost();

    function handleDeletePost(){
        deletePost({ postId : postId, token : token })
        navigate(-1);
    }

    return (
        <div className="post_details-container">
            {/* <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={()=>navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost"
                >
                    <img
                        src="../../../public/icons/back.svg"
                        alt="back"
                        width={24}
                        height={24} 
                    />
                    <p className="small-medium lg:base-medium">Back</p>
                </Button>
            </div> */}

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
                            <Link
                                to={`/profile/${post?.creator._id}`}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={post?.creator.imageUrl || "../../../public/icons/profile-placeholder.svg"} 
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

                            <div className="flex-center gap-4">
                                <Link
                                    to={`/update-post/${post?._id}`}
                                    className={` ${user._id !== post.creator._id && "hidden"}`}
                                >
                                    <img
                                        src="../../../public/icons/edit.svg"
                                        alt="edit"
                                        height={24}
                                        width={24}
                                    />
                                </Link>    
                                <Button
                                    onClick={handleDeletePost}
                                    variant="ghost"
                                    className={`ost_details-delete_btn ${user._id !== post.creator._id && "hidden"}`}
                                >
                                    <img
                                        src="../../../public/icons/delete.svg"
                                        alt="delete"
                                        height={24}
                                        width={24}
                                    />
                                </Button>
                            </div>   
                        </div>

                        <hr className="border w-full border-dark-4/80" />

                        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                            <p>{post.caption}</p>
                            <ul className="flex gap-1 mt-2">
                                {post.tags.map((tag,index)=>(
                                    <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                        #{tag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full">
                            <PostStats post={post} userId={user._id}/>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}