import { useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer"

import { Input } from '../../components/ui/input'
import Loader from '../../components/shared/Loader';
import GridPostList from '../../components/shared/GridPostList';
import { UserContext } from '../../context/AuthContext';

import useDebounce from '../../hooks/useDebounce';
import { useSearchPost, useGetPosts } from '../../lib/react-query/queries';

function SearchResults({ isSearchFetching, searchedPosts }){
    if(isSearchFetching){
        <Loader/>
    }else if(searchedPosts && searchedPosts.length > 0){
        return <GridPostList posts={searchedPosts}/>
    }else{
        return (
            <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
        )
    }
}

function Explore(){
    const { ref, inView } = useInView();
    const { token } = UserContext()
    const [searchValue, setSearchValue] = useState("");
    const debounceSearch = useDebounce(searchValue, 1000);
    const { data : searchPosts, isFetching : isSearchFetching } = useSearchPost(debounceSearch, token)
    const { data , fetchNextPage, hasNextPage } = useGetPosts(token);
    const posts = data?.pages;

    useEffect(()=>{
        if(inView && !searchValue){
            fetchNextPage();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inView, searchValue])

    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts = !shouldShowSearchResults && posts?.length === 0

    if(!posts){
        return (
            <div className='flex-center w-full h-full'>
                <Loader/>
            </div>
        )
    }

    return (
        <div className='explore-container'>
            <div className='explore-inner_container'>
                <h2 className='h3-bold md:h2-bold w-full flex justify-center items-center'>Search Posts</h2>
                <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
                    <img
                        src="../../../icons/search.svg"
                        alt="search"
                        height={24}
                        width={24}
                    />
                    <Input 
                        type="text"
                        placeholder="Search Posts"
                        className="explore-search"
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
                <h3 className='body-bold md:h3-bold'>Popular Today</h3>
                <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
                    <p className='small-medium md:base-medium text-light-2'>
                        All
                    </p>
                    <img
                        src="../../../icons/filter.svg"
                        alt="filter"
                        height={20}
                        width={20}
                    />
                </div>
            </div>

            <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
                {/* {shouldShowSearchResults ? (
                    <SearchResults
                        isSearchFetching={isSearchFetching}
                        searchedPosts={searchPosts}
                    />
                ) : shouldShowPosts ? (
                    <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>
                ) : (
                    <GridPostList posts={posts}/>
                )} */}
                { shouldShowSearchResults && <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchPosts} />}
                { shouldShowPosts &&  <p className='text-light-4 mt-10 text-center w-full'>End of posts</p> }
                { !shouldShowPosts && !shouldShowSearchResults &&
                    posts.map((post, i) => (
                        <GridPostList key={i} posts={post}/>
                    ))
                }
            </div>

            { hasNextPage && !searchValue && (
                <div ref={ref} className='mt-10'>
                    <Loader/>
                </div>
            )}
        </div>
    )
}

export default Explore