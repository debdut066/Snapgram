import {
    // useQuery,
    useMutation,
    // useQueryClient,
    // useInfiniteQuery
} from "@tanstack/react-query"
import { 
    createUserAccount, 
    signInAccount
} from "../../api/authApi.js"

import {
    createPost
} from "../../api/postApi.js"

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn : (user) => createUserAccount(user)
    })
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn : (user) => signInAccount(user)
    })
};

export const useCreatePost = () => {
    return useMutation({
        mutationFn : (post, token) => createPost(post, token),
        onSuccess : (data) => {
            return data;
        }
    })
}