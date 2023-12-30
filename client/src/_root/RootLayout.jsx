import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../context/AuthContext"

import Topbar from "../components/shared/Topbar"
import BottomBar from "../components/shared/BottomBar"
import LeftSideBar from "../components/shared/leftSideBar"

const RootLayout = () => {
  const { isAuthenticated } = UserContext();

  return isAuthenticated ? (
    <div className="w-full md:flex">
      <Topbar/>
      <LeftSideBar/>
      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>
      <BottomBar/>
    </div>
  ) : (
      <Navigate to="/sign-in" replace/>
  )
}

export default RootLayout
