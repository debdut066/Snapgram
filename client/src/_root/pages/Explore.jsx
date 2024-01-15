import { useState} from 'react'

import { Input } from '../../components/ui/input'

function Explore(){
    const [searchValue, setSearchValue] = useState("");

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



        </div>
    )
}

export default Explore