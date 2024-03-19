import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function creatComment(data, token){
    const response = await axios.post(`${BASE_URL}/comment/create`, 
    data, 
    {
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

export async function likeComment(commentId, token){
    const response = await axios.put(`${BASE_URL}/comment/like/${commentId}`, 
        { data : "" },
        {
            headers : {
                'Content-Type': 'application/json',
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

export async function GetComments(page, postId, token){
    const response = await axios.get(`${BASE_URL}/comment/${postId}`, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        params : {
            page,
        }
    });
    try {
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteComment(commentId, token, postId){
    const response = await axios.put(`${BASE_URL}/comment/delete/${commentId}`, 
        { postId : postId },
        {
            headers : {
                'Content-Type': 'application/json',
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