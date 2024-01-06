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
    deletePost,
    likePost,
    editPost
} from "../../api/postApi.js"
import { QUERY_KEYS } from "./queryKeys.js"

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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ formdata, token}) => {
            createPost(formdata, token)
        },
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        }
    })
}

export function useGetRecentPosts(token, page, limit){
    return useQuery({
        queryKey : [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn : () => getRecentPost(token, page, limit)
    })
}

export function useGetPostById(token, postId){
    return useQuery({
        queryKey : [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn : () => getPostById(token, postId),
        enabled : !!postId
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
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export function useEditPost(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : async ({ reqData, token, postId }) => {
            const result = await editPost(reqData, token, postId);
            return result;
        },
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID, data?.id]
            })
        }
    })
}

export function useLikePost(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ postId, token }) => {
            likePost(postId, token)
        },
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey : [QUERY.GET_POST_BY_ID, data?._id]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY.GET_RECENT_POSTS]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY.GET_POSTS]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY.GET_CURRENT_USER]
            });
        }
    })
}