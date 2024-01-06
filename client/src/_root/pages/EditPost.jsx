import { useParams } from "react-router-dom"

import { useGetPostById } from "../../lib/react-query/queries";
import PostForm from "../../components/forms/PostForm";
import Loader from "../../components/shared/Loader";
import { UserContext } from "../../context/AuthContext";

export default function EditPost(){
    const { id : postId } = useParams();
    const { token } = UserContext();
    const { data : post, isLoading } = useGetPostById(token, postId);

    if(isLoading){
        return(
            <div className="flex-center w-full h-full">
                <Loader/>
            </div>
        )
    }

    return(
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img
                        src="../../../icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
                </div>
                {isLoading 
                    ? <Loader/> 
                    : <PostForm action="Edit" post={post}/>
                }
            </div>
        </div>
    )
}