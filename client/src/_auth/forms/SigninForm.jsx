// import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"

import { SignupValidation } from "../../lib/validation"
import { useSignInAccount } from "../../lib/react-query/queries";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Query
  const { mutateAsync : signInAccount, isLoading } = useSignInAccount();

  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      password : "",
    },
  })

  async function handleSignIn(user) {
    const response = await signInAccount(user);

    if(response){
      toast({ title : "Login failed. Please try again"})
    }
    return;
  }



  return (
    <Form {...form}>
      <section className="sm:w-420 flex-center flex-col">
        <img src="../../../public/images/logo.svg" alt="logo"/>
        <h2 
          className="
            h3-bold 
            md:h2-bold 
            pt-5 
            sm:pt-12
          "
        >
          Login in to your account
        </h2>
        <p 
          className="
            text-light-3
            small-medium
            md:base-regular
            mt-2
          "
        >
          Welcome back! Please enter your details
        </p>
        <form 
          onSubmit={form.handleSubmit(handleSignIn)} 
          className="flex flex-col gap-5 mt-4 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit" 
            className="shad-button_primary"
          >
            { isLoading ? 
                <div className="flex-center gap-2">
                  <Loader/> Loading...
                </div>
              :
                "Sign Up"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-semibold ml-2"
            >
              Sign in
            </Link>
          </p>
      </form>
      </section>
    </Form>
  )
}

export default SigninForm