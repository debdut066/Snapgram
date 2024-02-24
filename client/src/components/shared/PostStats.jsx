import { useEffect, useState } from "react"
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFatBold } from "react-icons/pi";

import { useLikePost, useSavePost } from "../../lib/react-query/queries";
import { checkedIsLiked } from "../../lib/utils";

export default function PostStats({ post, user, token }){
    const likesList = post.likes
    
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate : likePost } = useLikePost();
    const { mutate : savePost } = useSavePost();

    const savedPostRecord = post.saved.find((record) => record === user._id)

    useEffect(()=>{
        setIsSaved(savedPostRecord)
    },[user])

    async function handleLike(e){
        e.stopPropagation();

        let likesArray = [...likes];
        if(likesArray.includes(user._id)){
            likesArray = likesArray.filter((id) => id !== user._id);
        }else{
            likesArray.push(user._id);
        }
        setLikes(likesArray);
        likePost({ postId : post._id, token : token });
    }

    async function handleSave(e){
        e.stopPropagation();

        if(savedPostRecord){
            setIsSaved(false);
        }

        savePost({ postId : post._id, token : token });
        setIsSaved(true)  
    }    

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 mr-5">
                <span className="flex gap-2 mr-5">
                    <img
                        src={`${
                            checkedIsLiked(likes, user._id)
                            ?  "../../../icons/liked.svg"
                            :   "../../../icons/like.svg"
                        }`}
                        alt="like"
                        height={20}
                        width={20}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                    <p className="small-medium lg:base-medium">{likes.length}</p>
                </span>
                <span className="flex gap-2 mr-5">
                    <AiOutlineComment color="#8983d9" size={24}/>
                    <p className="small-medium lg:base-medium">{post.c_c}</p>
                </span>
                <span className="flex gap-2 mr-5">
                    <PiShareFatBold color="#8983d9" size={24}/>
                    <p className="small-medium lg:base-medium">{post.s_c}</p>
                </span>
            </div>
            <div className="flex gap-2">
                <img
                    src={isSaved 
                        ? "../../../icons/saved.svg" 
                        : "../../../icons/save.svg"
                    }
                    alt="save"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={handleSave}
                />
            </div>
        </div>
    )
}