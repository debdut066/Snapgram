
import { Link } from "react-router-dom"

import PostStats from "./PostStats"
import { UserContext } from "../../context/AuthContext";

export default function GridPostList({ posts , showUser = true, showStats = true }){
	const { user, token } = UserContext();
	
	return (
		<ul className="grid-container">
			{posts.map((post) => (
				<li key={post._id} className="relative min-w-80 h-80" >
					<Link to={`/post/${post._id}`} 
						className="grid-post_link"
					>
						<img
							src={post.imageUrl}
							alt="post"
							className="h-full w-full object-cover"
						/>
					</Link>

					<div className="grid-post_user">
						{ showUser && (
							<div className="flex items-center justify-start gap-2 flex-1">
								<img
									src={post.creator.imageUrl || "../../../icons/profile-placeholder.svg"}
									alt="user"
									className="w-8 h-8 rounded-full"
								/>
								<p className="line-clamp-1">{post.creator.name}</p>
							</div>
						)}
						{showStats && <PostStats post={post} user={user} token={token}/>}
					</div>
				</li>
			)) }
		</ul>
	)
}