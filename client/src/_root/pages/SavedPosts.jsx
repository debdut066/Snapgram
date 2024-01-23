import Loader from "../../components/shared/Loader";
import { UserContext } from "../../context/AuthContext";
import { useGetSavedPost } from "../../lib/react-query/queries"


export default function SavedPosts(){
	const { token } = UserContext();
	const { data : savedPost, isLoading : isPostLoading, } = useGetSavedPost(token)

	if(isPostLoading){
		<Loader/>
	}

	console.log("post", savedPost)

	return(
		<div>SavedPost</div>
	)
}