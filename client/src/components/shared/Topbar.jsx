// import React from 'react'

import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const Topbar = () => {

  const handleSignout = () => {
    
  }

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="../../../public/images/logo.svg"
            alt="logo"
            width={130}
            height={150}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            className="shad-button_ghost"
            variant="ghost"
            onClick={handleSignout}
          >
            <img src="../../../public/icons/logout.svg" alt="profile"/>
          </Button>

          <Link to={`/profile/:id`} className="flex-center gap-3">
            <img
              src="../../../public/images/user.jpg"
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar