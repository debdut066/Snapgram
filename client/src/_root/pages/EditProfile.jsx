
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
} from "../../components/ui/form";
import { useToast } from "../../components/ui/use-toast";
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea"
import { ProfileUploader } from "../../components/shared/ProfileUploader";
import Loader from "../../components/shared/Loader"

import { UserContext } from "../../context/AuthContext"
import { ProfileValidation } from "../../lib/validation"; 

import { useUpdateUser } from "../../lib/react-query/queries";

export default function EditProfile(){
    const navigate = useNavigate();
    const { toast } = useToast();
    const { token, user } = UserContext();
    const { mutateAsync: updateUser, isLoading: isUpdatingUser } = useUpdateUser();
    
    const form = useForm({
        resolver : zodResolver(ProfileValidation),
        defaultValues : {
            file : [],
            name : user.name,
            username : user.username,
            email : user.email,
            bio : user.bio,
        }
    })

    async function handleUpdate(values){
        let formdata = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if(key === "file"){
            formdata.append(key, value[0]);
          }else{
            formdata.append(key, value);
          }
        })
        const updatedPost = await updateUser({ reqData : values, token : token, userId : user._id })
      
        if (updatedPost !== "profile updated") {
            toast({
                title: `profile update failed. Please try again.`,
            });
        }
        toast({ 
            title : 'profile updated successfully'
        })
        return navigate(`/profile/${user._id}`)
    }

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img
                        src="../../../icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleUpdate)}
                        className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem className="flex">
                                    <FormControl>
                                        <ProfileUploader
                                            fieldChange={field.onChange}
                                            mediaUrl={user.imageUrl}
                                        />
                                    </FormControl>
                                    <FormMessage className="shad-form_message" />
                                </FormItem>
                            )}
                        />

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
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            {...field}
                                            disabled
                                        />
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
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            {...field}
                                            disabled
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">Bio</FormLabel>
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

                        <div className="flex gap-4 items-center justify-end">
                        <Button
                            type="button"
                            className="shad-button_dark_4"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="shad-button_primary whitespace-nowrap"
                            disabled={isUpdatingUser}
                        >
                            {isUpdatingUser && <Loader />}
                            Update Profile
                        </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}