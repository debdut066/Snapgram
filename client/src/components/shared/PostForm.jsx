import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"

import FileUploader from "./FileUploader";
import { ProfileValidation } from "../../lib/validation";

export default function PostForm ({ post, action }) {
  const form = useForm({
    resolver : zodResolver(ProfileValidation),
    defaultValues : {
      caption : post ? post?.caption : "",
      file : [],
      location : post ? post.location : "",
      tags : post ? post.tags.join(",") : ""
    }
  })

  const handleSubmit = async (value) => {

  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-9 w-full max-w-5xl"
        onSubmit={handleSubmit}
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}