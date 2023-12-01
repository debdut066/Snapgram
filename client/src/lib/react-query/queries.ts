import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"
import { createUserAccount } from "../../api/authApi.js"

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn : (user) => createUserAccount(user)
    })
};