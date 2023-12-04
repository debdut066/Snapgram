import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createUserAccount = async (data) => {
    const response = await axios.post(`${BASE_URL}/register`, data, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    try{
        return response.data;
    }catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}

export const signInAccount = async (data) => {
    const response = await axios.post(`${BASE_URL}/login`, data, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    try{
        return response.data;
    }catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}
