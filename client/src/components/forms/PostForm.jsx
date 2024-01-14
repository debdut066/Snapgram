import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { UserContext } from "../../context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Loader from "../shared/Loader"

import FileUploader from "../shared/FileUploader";
import { PostValidation } from "../../lib/validation";
import { useCreatePost, useEditPost } from "../../lib/react-query/queries";

export default function PostForm ({ post, action }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = UserContext();

  const form = useForm({
    resolver : zodResolver(PostValidation),
    defaultValues : {
      caption : post ? post?.caption : "",
      file : [],
      location : post ? post.location : "",
      tags : post ? post.tags.join(",") : ""
    }
  })

  const { mutateAsync: createPost, isLoading: isLoadingCreate } = useCreatePost();

  const { mutateAsync : editPost, isLoading: isLoadingUpdate } = useEditPost();

  const onSubmit = async (values) => {

    if(action === "Edit"){
      const updatedPost = await editPost({ reqData : values, token : token, postId : post._id })
      
      if (![updatedPost]) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/post/${post._id}`)

    }else{
      let formdata = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if(key === "file"){
          formdata.append(key, value[0]);
        }else{
          formdata.append(key, value);
        }
      })
      await createPost({ formdata : formdata, token : token });
      navigate('/');
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-9 w-full max-w-5xl"
        onSubmit={form.handleSubmit(onSubmit)}
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
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
                </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              className="shadn-button-dark-4"
              onClick={()=>navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              disabled={isLoadingCreate || isLoadingUpdate}
            >
              {isLoadingCreate && <Loader/>}
              {action} Post
            </Button>
        </div>
      </form>
    </Form>
  )
}