export default function AllUsers(){
    
    return (
        <div className="common-container">
            <div className="user-container">
                <div className="flex gap-2 w-full">
                    <img
                        src="../../../icons/people.svg"
                        alt="user"
                        width={36}
                        height={36}
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
                </div>
            
            </div>
        </div>
    )
}