import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom"

import { Toaster } from "@/components/ui/toaster"
const Home = lazy(()=> import("./_root/pages/Home"))
const AuthLayout = lazy(() => import("./_auth/AuthLayout"))
const RootLayout = lazy(() => import("./_root/RootLayout"))
const EditPost = lazy(() => import("./_root/pages/EditPost"))
const SignupForm = lazy(() => import("./_auth/forms/SignupForm"))
const SigninForm = lazy(() => import("./_auth/forms/SigninForm"))
const CreatePost = lazy(() => import("./_root/pages/CreatePost"))
const PostDetails = lazy(() => import("./_root/pages/PostDetails"))
const Profile = lazy(() => import("./_root/pages/Profile"))
const EditProfile = lazy(() => import("./_root/pages/EditProfile"))
const Explore = lazy(() => import("./_root/pages/Explore"))
const SavedPost = lazy(()=>import("./_root/pages/SavedPosts"))
const AllUsers = lazy(()=> import("./_root/pages/AllUsers"))

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
            <Route index element={<Home/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/post/:id" element={<PostDetails/>}/>
            <Route path="/edit/:id" element={<EditPost/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/saved" element={<SavedPost/>}/>
            <Route path="/profile/:id/*" element={<Profile/>}/>
            <Route path="/all-users" element={<AllUsers/>}/>
            <Route path="/profile/update/:id" element={<EditProfile/>}/>
          </Route>
        </Routes>
      </Suspense>

      <Toaster/>
    </main>
  )
}

export default App
