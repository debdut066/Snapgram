"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import { Button } from "@/components/ui/button"
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

import { SignupValidation } from "../../lib/validation"

const SignupForm = () => {
  const [isloading, setIsLoading] = useState(false); 
  
  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name : "",
      username: "",
      email : "",
      password : "",
    },
  })

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
          Create a new account
        </h2>
        <p 
          className="
            text-light-3
            small-medium
            md:base-regular
            mt-2
          "
        >
          To use Snapgram enter your details
        </p>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 mt-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
            { isloading ? 
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
              :
              "Sign Up"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-semibold ml-2"
            >
              Log in
            </Link>
          </p>
      </form>
      </section>
    </Form>
  )
}

export default SignupForm