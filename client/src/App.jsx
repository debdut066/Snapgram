import { lazy, Suspense } from 'react';

import { Route, Routes } from "react-router-dom"
const AuthLayout = lazy(() => import("./_auth/AuthLayout"))
const RootLayout = lazy(() => import("./_root/RootLayout"))
const SignupForm = lazy(() => import("./_auth/forms/SignupForm"))
const SigninForm = lazy(() => import("./_auth/forms/SigninForm"))
const Home = lazy(()=> import("./_root/pages/Home"))
const CreatePost = lazy(() => import("./_root/pages/CreatePost"))
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

function App() {

  const RenderLoader = () => <p>Loading</p>;

  return (
    <main className="flex h-screen">
      <Suspense fallback={<RenderLoader/>}>
        <Routes>
          {/* Public route */}
          <Route element={<AuthLayout/>}>
            <Route path="/sign-up" element={<SignupForm/>}/>
            <Route path="/sign-in" element={<SigninForm/>}/>
          </Route>

          {/* Private route */}
          <Route element={<RootLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
          </Route>
        </Routes>
      </Suspense>

      <Toaster/>
    </main>
  )
}

export default App
