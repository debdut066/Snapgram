import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function creatComment(data, token){
    const response = await axios.post(`${BASE_URL}/comment/create`, 
    data, 
    {
        headers : {
            'Content-Type': 'multipart/form-dataapplication/json',
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