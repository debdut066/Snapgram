import { sidebarLinks } from "../../constants"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"

const LeftSideBar = () => {
  return (
    <div className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="../../../public/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="../../../public/images/user.jpg" 
            alt="profile-image"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">Debdut</p>
            <p className="small-regular text-light-3">@Debdut066</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            <li
              className={`leftsidenar-link group ${}`}
              key={link.label}
            >
              <NavLink>
                <img 
                  src={link.imgURL}
                  alt={link.label}
                  className=""
                />
                {link.label}
              </NavLink>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default LeftSideBar