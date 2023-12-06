import { Outlet } from "react-router-dom"

import Topbar from "../components/shared/Topbar"
import BottomBar from "../components/shared/BottomBar"
import LeftSideBar from "../components/shared/leftSideBar"

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      {/* <Topbar/> */}
      <LeftSideBar/>
      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default RootLayout