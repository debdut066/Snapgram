import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"
import { 
    createUserAccount, 
    signInAccount
} from "../../api/authApi.js"

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
