import { sidebarLinks } from "../../constants"
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { UserContext } from "../../context/AuthContext"


const LeftSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user, token } = UserContext();

  const handleSignOut = async (e) => {
    e.preventDefault();
    logout();
    navigate("/sign-in")
  }
  
  return (
    <div className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="../../../images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user._id}`} className="flex gap-3 items-center">
          <img 
            src={user.imageUrl || "../../../icons/profile-placeholder.svg"} 
            alt="profile-image"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-3 overflow-hidden">
          {sidebarLinks.map((link) => {
            let isActive = pathname === link.route;

            return (
              <li
                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img 
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={handleSignOut}>
        <img src="../../../icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </div>
  )
}

export default LeftSideBar