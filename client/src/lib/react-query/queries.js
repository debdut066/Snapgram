import {
    useQuery,
    useMutation,
    useQueryClient,
    // useInfiniteQuery
} from "@tanstack/react-query"
import { 
    createUserAccount, 
    signInAccount
} from "../../api/authApi.js"

import {
    createPost,
    getRecentPost,
    getPostById,
    deletePost
} from "../../api/postApi.js"

export function useCreateUserAccount(){
    return useMutation({
        mutationFn : (user) => createUserAccount(user)
    })
}

export function useSignInAccount(){
    return useMutation({
        mutationFn : (user) => signInAccount(user)
    })
}

export function useCreatePost(){
    return useMutation({
        mutationFn : ({ formdata, token}) => {
            createPost(formdata, token)
        },
        onSuccess : (data) => {
            return data;
        }
    })
}

export function useGetRecentPosts(token, page, limit){
    return useQuery({
        queryKey : [token , page, limit],
        queryFn : () => getRecentPost(token, page, limit)
    })
}

export function useGetPostById(token, postId){
    return useQuery({
        queryKey : [token, postId],
        queryFn : () => getPostById(token, postId)
    })
}

export function useDeletePost(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ postId, token }) => {
            deletePost(postId, token)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["deletePost"]
            })
        }
    })
}