import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"

import { 
    createUserAccount, 
    signInAccount,
} from "../../api/authApi.js"
import {
    likePost,
    editPost,
    savePost,
    createPost,
    deletePost,
    getPostById,
    searchPosts,
    getRecentPost
} from "../../api/postApi.js"
import { creatComment, likeComment, GetComments, deleteComment } from "../../api/commentApi.js" 
import { getUserById, updateUser, getSavedPost } from "../../api/userApi.js"
import { QUERY_KEYS } from "./queryKeys.js"

let PER_PAGE = 3

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

export function useGetRecentPosts(token){
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn : ({ pageParam = 1 }) => getRecentPost(pageParam, token),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === PER_PAGE ? allPages.length + 1 : undefined;
        },
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
                queryKey : [QUERY_KEYS.GET_POST_BY_ID, data?._id]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POSTS]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            });
        }
    })
}

export function useUpdateUser(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : async ({ reqData, token, userId }) => {
            const result = await updateUser(reqData, token, userId);
            return result;
        },
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            }),
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_USER_BY_ID, data._id]
            })
        }
    })
}

export function useGetUserById(userId, token){
    return useQuery({
        queryKey : [QUERY_KEYS.GET_USER_BY_ID, userId],
        queryFn : () => getUserById(userId, token),
        enabled : !!userId
    })
}

export function useSearchPost(searchTerm, token ){
    return useQuery({
        queryKey : [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn : () => searchPosts(searchTerm, token),
        enabled : !!searchTerm
    })
}

export function useSavePost(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ postId, token }) => {
            savePost(postId, token)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POSTS]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            });
        }
    })
}

export function useGetSavedPost(token){
    return useQuery({
        queryKey : [QUERY_KEYS.GET_SAVED_POST, token],
        queryFn : () => getSavedPost(token),
    })
}

export function useCreateComment(postId){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ data, token}) => {
            creatComment(data, token)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_COMMENTS],
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID, postId]
            });
        }
    })
}

export function useGetPosts(token){
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn : ({ pageParam = 1 }) => getRecentPost(pageParam, token),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === PER_PAGE ? allPages.length + 1 : undefined;
        },
    })
}

export function useLikeComment(postId){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ commentId, token }) =>{
            likeComment(commentId, token)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID, postId]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_COMMENTS]
            })
        }
    })
}

export function useDeleteComment(postId){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ commentId, token }) =>{
            deleteComment(commentId, token, postId)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID, postId]
            });

            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_COMMENTS]
            })
        }
    })
}

export function useGetComments(postId, token){
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.GET_RECENT_COMMENTS],
        queryFn : ({ pageParam = 1 }) => GetComments(pageParam, postId ,token),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === PER_PAGE ? allPages.length + 1 : undefined;
        },
    })
}