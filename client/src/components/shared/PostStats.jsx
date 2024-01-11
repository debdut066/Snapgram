import { useState } from "react"

import { useLikePost } from "../../lib/react-query/queries";
import { checkedIsLiked } from "../../lib/utils";

export default function PostStats({ post, userId, token }){
    const likesList = post.likes
    
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate : likePost, data: likeed } = useLikePost();

    async function handleLike(e){
        e.stopPropagation();

        let likesArray = [...likes];
        if(likesArray.includes(userId)){
            likesArray = likesArray.filter((id) => id !== userId);
        }else{
            likesArray.push(userId);
        }
        setLikes(likesArray);
        likePost({ postId : post._id, token : token });
    }

    return (
        <div className={`flex justify-between items-center`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${
                        checkedIsLiked(likes, userId)
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
                    onClick={()=>{}}
                />
            </div>
        </div>
    )
}