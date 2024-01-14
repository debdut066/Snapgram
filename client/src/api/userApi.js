import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserById = async (userId, token) => {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    try{
        return response.data;
    }catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}

export async function updateUser(data, token, userId){
    const response = await axios.put(`${BASE_URL}/user/update/${userId}`, data, {
        headers : {
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
        }
    });
    try{
        return response.data;
    }catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}