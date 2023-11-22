import { Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import SignupForm from "./_auth/forms/SignupForm"
import SigninForm from "./_auth/forms/SigninForm"
import Home from "./_root/pages/Home"

import "./globals.css"

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public route */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign-up" element={<SignupForm/>}/>
          <Route path="/sign-in" element={<SigninForm/>}/>
        </Route>

        {/* Private route */}
        <Route element={<RootLayout/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </main>
  )
}

export default App
