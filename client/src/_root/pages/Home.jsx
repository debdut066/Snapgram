import { useEffect } from "react";
import { useInView } from "react-intersection-observer"
import { useGetRecentPosts } from "../../lib/react-query/queries"
import { UserContext } from "../../context/AuthContext";
import Loader from "../../components/shared/Loader";
import PostCard from "../../components/shared/PostCard";
import { Fragment } from "react";

const Home = () => {
  const { ref, inView } = useInView();
  const { token } = UserContext();
  const { data , isFetchingNextPage, Error : isErrorPosts, fetchNextPage, hasNextPage } = useGetRecentPosts(token);
  const posts = data?.pages;
  
  useEffect(()=>{
    if(inView){
        fetchNextPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inView])

  if(isErrorPosts){
    return(
      <div className="flex flex-1">
        <div className="home-container">
          <div className="body-medium text-light-1">
            Something bad happened
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h-2-bold text-left w-full">Home Feed</h2>
          {!posts ? (
            <Loader/>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts.map((post, i) => (
                <Fragment key={i}>
                  {post.map((item, idx) => (
                    <li className="flex justify-center w-full" key={idx}>
                      <PostCard post={item}/>
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          )}
        </div>
        { hasNextPage && (
          <div ref={ref} className='mt-10'>
            <Loader/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home