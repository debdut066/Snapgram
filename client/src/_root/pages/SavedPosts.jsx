import Loader from "../../components/shared/Loader";
import { UserContext } from "../../context/AuthContext";
import { useGetSavedPost } from "../../lib/react-query/queries"
import GridPostList from "../../components/shared/GridPostList";


export default function SavedPosts(){
	const { token } = UserContext();
	const { data : savedPosts, isLoading : isPostLoading, } = useGetSavedPost(token)
	return(
		<div className="saved-container">
			<div className="flex gap-2 w-full max-5-xl">
				<img
					src="../../../icons/save.svg"
					alt="save"
					width={36}
					height={36}
					className="invert-white"
				/>
				<h2 className="h3-bold md:h2-bold text-left w-full">Saved Post</h2>
			</div>
			{isPostLoading ? (
				<Loader/>
			) : (
				<ul className="w-full flex justify-center max-w-5xl gap-9">
					{savedPosts.length === 0 ? (
						<p>No post available</p>
					) : (
						<GridPostList posts={savedPosts.saved} showStats={true}/>
					)}
				</ul>
			)}
		</div>
	)
}